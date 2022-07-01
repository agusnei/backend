// Desafío 2: Manejo de archivos en Javascript
// Importar módulo fs
const fs = require('fs');

class Producto {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = 0;
    }
}

class Contenedor {
    constructor(file) {
        this.file = file;
    }

    // Recibe un objeto, lo guarda en el archivo, devuelve el id con nuevo id.
    async save(object) {
        try {
            let products = JSON.parse(await fs.promises.readFile(this.file, 'utf-8'));
            
            // Archivo existente vemos el id que existe y le asignamos al nuevo uno id nuevo
            !products.length ? object.id = 1 : object.id = products[products.length - 1].id + 1;
            products.push(object);
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, '\t'));
            return object.id;
        } catch (err) {
            
            //en el caso que el archivo no exista, lo crea
            if (err.code === 'ENOENT') {
                object.id = 1;
                await fs.promises.writeFile(this.file, JSON.stringify([object], null, '\t'));
                return object.id;
            } else {
                console.log('Error al guardar: ', err);
            }
        }
    }

    // Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(number) {
        try {
            let products = JSON.parse(await fs.promises.readFile(this.file, 'utf-8'));
            const object = products.find(object => object.id === number);
            return object ? object : null;
        } catch (err) {
            console.log('Error al consultar por id: ', err);
        }
    }

    // Devuelve un array con los objetos presentes en el archivo actual
    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile(this.file, 'utf-8'));
        } catch (err) {
            if (err.code === 'ENOENT') {
                return [];
            } else {
                console.log('Error al mostrar todos los productos: ', err);
            }
        }
    }

    // Elimina del archivo el objeto con el id buscado.
    async deleteById(number) {
        try {
            let products = JSON.parse(await fs.promises.readFile(this.file, 'utf-8'));
            let productsAct = products.filter(object => object.id != number);
            await fs.promises.writeFile(this.file, JSON.stringify(productsAct, null, '\t'));
        } catch (err) {
            console.log('Error al querer eliminar el producto con el id ingresado: ', err);
        }
    }

    // Elimina todos los objetos
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([], null, '\t'));
        } catch (err) {
            console.log('Error al eliminar todo: ', err);
        }
    }

    // Actualiza un objeto según su id. DEvuelve el objeto actualizado, o no encontrado
    async updateById(id, object) {
        try {
            let products = JSON.parse(await fs.promises.readFile(this.file, 'utf-8'));
            object.id = id;
            
            const index = products.findIndex((product) => {
                return product.id === object.id;
            })

            if (index !== -1) {
                products[index] = object;
                await fs.promises.writeFile(this.file, JSON.stringify(products, null, '\t'));
                return object;
            } else {
                return { error: 'El producto no exite'}
            }
        } catch (err) {
            console.log('Error al actualizar el producto: ', err);
        }
    }
}

module.exports = {
    Contenedor: Contenedor,
    Producto: Producto,
};