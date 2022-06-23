//config basica express and routes
const express = require('express')
const app = express()
const rutas = require('./routes/index')
const puerto = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const path = require('path')

//rutas
// app.use('/', express.static(__dirname + '/html'));

//pug
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

app.use('/api/productos', rutas)

//msj servidor
app.listen(puerto, err =>{
    if(err){
        console.log(`Hubo error en el servidor ${err}`)
    } else {
        console.log(`servidor escucha a puerto: ${puerto}`)
    }
})