const fs = require("fs");

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

  getById = async (numeroID) => {
        //Recibe un ID y devuelve objeto con ID, o msj si no existe
        let data = await fs.promises.readFile(this.filename, "utf-8");
        let arr = JSON.parse(data);
        let findNumeroID = arr.find(({ id }) => id == numeroID);
    try {
        findNumeroID == undefined
          ?  console.log(`El producto con el ID ${numeroID} no existe`)
          : console.log(`El producto con el ID ${numeroID} es: ${findNumeroID.title}`);
    } catch (error) {
        console.log(`Error en la búsqueda: ${error}`);
    }
    return findNumeroID;
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

  deleteAll = () => {
        //Elimina todos los objetos del archivo txts
        console.log("Se han eliminado todos los productos")
        fs.promises.writeFile(this.filename, "");
  };
}

//genero el archivo contendor
const file = new Contenedor("./productos.txt");

//obj que quiero guardar en archivo
const saveFunction = async () => {
    await file.save({
          title: "HILUX",
          price: "10000",
          thumbnail: "url_//...jpg1",
  });

    await file.save({
        title: "RANGER",
        price: "20000",
        thumbnail: "url_//ranger...jpg1",
  });

    await file.save({
        title: "F100",
        price: "30000",
        thumbnail: "url_//f100...jpg1",
  });

    await file.save({
        title: "BRONCO",
        price: "40000",
        thumbnail: "url_//bronco...jpg1",
  });

//   await file.getById(2);

//   await file.getAll();

//   await file.deleteById(2);

//   await file.deleteAll();
};

saveFunction();