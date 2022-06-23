//config basica express and routes
const express = require('express')
const app = express()
const rutas = require('./routes/index')
const puerto = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const path = require('path')
const { engine } = require('express-handlebars')

//rutas
// app.use('/', express.static(__dirname + '/html'));


//handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layout/main.hbs'),
    layoutsDir: path.join(__dirname, './views/layout'),
    partialsDir: path.join(__dirname, './views/partials')
}))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')

app.use('/api/productos', rutas)

//msj servidor
app.listen(puerto, err =>{
    if(err){
        console.log(`Hubo error en el servidor ${err}`)
    } else {
        console.log(`servidor escucha a puerto: ${puerto}`)
    }
})