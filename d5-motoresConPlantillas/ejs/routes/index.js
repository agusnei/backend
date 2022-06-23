const { Router } = require('express')
const router = Router()

const fs = require("fs");
///CONTENEDOR class
class Contenedor {
    constructor(filename) {
        this.filename = filename;
        fs.promises.writeFile(filename, "[]");
    }

    save = async (objecto) => {
        //Recibe un objeto, lo guarda en el archivo, devuelve el ID asignado al producto
        let data = await fs.promises.readFile(this.filename, "utf-8");
        let arr = JSON.parse(data);
    try {
            arr = [...arr, objecto];
            objecto.id = arr.length;
            await fs.promises.writeFile(this.filename, JSON.stringify(arr, null, 2));
            console.log(`Producto creado con el ID: ${objecto.id}`)
            return objecto.id;
        } catch (err) {
            console.log(`No se ha podido guardar el objeto: ${err}`);
    }
    };

    saveById = async (objeto) => {
        //recibe un id y modifica segun put
        let data = await fs.promises.readFile(this.filename, "utf-8");
        let arr = JSON.parse(data);
    try {
        let findNumeroID = arr.filter(({id}) => id != objeto.id);
        await fs.promises.writeFile(this.filename, JSON.stringify(findNumeroID, null, 2))
            
        let data2 = await fs.promises.readFile(this.filename, "utf-8");
        let arr2 = JSON.parse(data2)    
        arr2 = [...arr2, objeto];
        await fs.promises.writeFile(this.filename, JSON.stringify(arr2, null, 2));
        console.log(`Producto actualizado con el ID: ${objeto.id}`)
        return arr2;
    } catch (err) {
            console.log(`No se ha podido guardar el objeto: ${err}`);
    }
    };

    getAll = async () => {
      //Devuelve un array con los objetos presentes en el archivo
        let data = await fs.promises.readFile(this.filename, "utf-8");
        let arr = JSON.parse(data);
        console.log(arr, "arr");
        return arr;
    };

    deleteById = async (numeroID) => {
            //Elimina del archivo el objeto con el ID buscado
            let data = await fs.promises.readFile(this.filename, "utf-8");
            let arr = JSON.parse(data);
        try {
            let findNumeroID = arr.filter(({id}) => id != numeroID);
            await fs.promises.writeFile(this.filename, JSON.stringify(findNumeroID, null, 2));
            console.log(`Se ha eliminado el producto con ID ${numeroID}`)
        } catch (err) {
            console.log(`No se ha podido eliminar el objeto: ${err}`);
        }
        };
}
//genero el archivo contendor
const file = new Contenedor("./productos.txt");
//obj que quiero guardar en archivo
const saveFunction = async () => {
    await file.save({
          title: "HILUX",
          price: "10000",
          thumbnail: "https://cdn.motor1.com/images/mgl/vkekA/s1/toyota-hilux-2021.jpg",
  });

    await file.save({
        title: "RANGER",
        price: "20000",
        thumbnail: "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/s/RT_V_57e26e28b95a4620ae3b3dec50fb5a22.jpg",
  });

    await file.save({
        title: "F100",
        price: "30000",
        thumbnail: "https://i0.wp.com/www.motorwebargentina.com/wp-content/uploads/2021/11/Ford-F-100-Eluminator-7.jpg?fit=1024%2C647&ssl=1",
  });

    await file.save({
        title: "BRONCO",
        price: "40000",
        thumbnail: "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/m/RT_V_5094a44b425b4953a52505a7018e410d.jpg",
  });

};
saveFunction();

//codigo desafio*********************************************************************************************

//get /api/productos me devuelve array de todos los productos disponibles
router.get('/', async (req,res)=>{
    let productos = await file.getAll()
    try {
        
        res.render('main.ejs', {productos})
    } catch(e) {
        console.log('Error: ', e)
        res.sendStatus(500)
    }
} );

//post /api/productos recibe y agrega un producto y lo devuelve con su id asignado
router.get('/add',async (req, res) => {
        res.render('addformproducts.ejs')
    })

router.post('/add', async (req, res) => {
        // res.render('addformproducts')
        const {title, price, thumbnail}= req.body
        await file.save({title, price, thumbnail})
    })

/*
//get /api/productos/:id me devuelve un producto al azar entre todo lo disponible
router.get('/:id', async (req,res)=>{
    const id = Number(req.params.id)
    if(isNaN(id)) {
        res.status(400).json({error: "Objeto no encontrado"})
        return
        } 
    let productos = await file.getAll()
    let producto = await productos.filter(producto =>{
        return producto.id === id
        })
    res.status(200).json(producto)
});

//put /api/productos/:id recibe y actualiza algun productos segun su id
router.put('/:id', (req,res) =>{
    const id = Number(req.params.id)
    const {title, price, thumbnail} = req.body
    file.saveById({title, price, thumbnail, id})
    return res.json(`El producto actualizado es ${title} con un precio de ${price} y su ${thumbnail}`)
})

//delete /api/productos/:id eliminara un prod segun el id
router.delete('/:id', (req,res) =>{
    const id = req.params.id
    file.deleteById(id)
    res.sendStatus(200)
})
*/

/***** */

module.exports = router