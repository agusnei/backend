import cookieParser from 'cookie-parser';
import session from 'express-session';
import express from 'express'
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { signUp_strategy, login_strategy } from './strategies.js';
import {modelo} from './models.js'
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { auth , validatePass} from './services.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongoConnection = process.env.PAK_MONGO
const port = process.env.PAK_PORT

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express();
mongoose.connect(mongoConnection)
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static( __dirname + '/public' ));

app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoConnection, mongoOptions
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 10000,
    },
  })
);

app.use(passport.initialize())
app.use(passport.session())

passport.use('register', signUp_strategy)
passport.use('login', login_strategy )

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  modelo.findById(id, done)
})

app.set('port', port)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`El servidor está escuchando el puerto: ${port} // DateTime: ${new Date()}`)
})

app.get('/', (req, res) => {
    if(req.user){
      res.render('index', {data : req.user.firstName})
      console.log(req.session)
      console.log(req.session.user);;
    }else{
      res.render('index', {data:undefined})
      console.log('data undefined',req.session)
      console.log('data undefined',req.session.user);;
    }
})

app.post('/login', passport.authenticate('login', {failureRedirect: '/login-error', failureMessage: true}), (req,res) => res.redirect('/'))

app.get('/logOut', auth, (req, res) => {
  let user = req.session.user
  req.session.destroy()
  res.render('bye', {data: user})
})

app.get('/register', (req,res) => {
  res.render('register')
})

app.post('/register',  validatePass ,await passport.authenticate('register', {failureRedirect: '/error'}), (req,res) => res.redirect('/'))

app.get('/error', (req, res) => {
  res.render('error', {data: 'error'})
})

app.get('/login-error', (req, res) => {
  res.render('login-error')
})

app.get('*', (req,res) => {
  res.render('error', {data: 'Error 404'})
})
