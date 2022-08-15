import express from 'express'
import routes from './router/index.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { Server } from 'socket.io'
import { chatDAO } from './DAO/chatDAO.js';
import { normalizedMessages } from './utils/normalize.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express()
const expressServer = app.listen(8080, () => console.log('Server escuchando en el puerto 8080'))
const io = new Server(expressServer)

//Configuracion session
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://agusneira:OIY2O7qR5F1jALyb@cluster0.64e5d.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions,
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true, 
    cookie: {
      maxAge: 10000,
    },
  })
)

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname,'./views')));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')


io.on('connection', async socket =>  {
    console.log(`Se conecto el cliente con id: ${socket.id}`)

    const messagesFromMongo = await chatDAO.getAll()
    const normalizedChat = normalizedMessages(messagesFromMongo)

    socket.emit('server:mensajes', normalizedChat)

    socket.on('client:message', async (messageInfo) => {
        await chatDAO.postMessage(messageInfo)

        const messagesFromMongo = await chatDAO.getAll()
        const normalizedChat = normalizedMessages(messagesFromMongo)
        io.emit('server:mensajes', normalizedChat)
    })
})

app.use('/api', routes)
