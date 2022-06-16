//config basica express and routes
const express = require('express')
const app = express()
const rutas = require('./routes/index')
const puerto = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//rutas
app.use('/', express.static(__dirname + '/html'));

app.use('/api/productos', rutas)


//msj servidor
app.listen(puerto, err =>{
    if(err){
        console.log(`Hubo error en el servidor ${err}`)
    } else {
        console.log(`servidor escucha a puerto: ${puerto}`)
    }
})