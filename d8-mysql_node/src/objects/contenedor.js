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
    constructor(database, table) {
        this.database = database;
        this.table = table;
    }

    async save(object) {
        // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        try {
            await this.database(this.table).insert(object);
            const id = await this.database(this.table).select('id').max('id');

            return id;
        } catch (err) {
            //en el caso que la tabla no exista, la crea
            if ((err.code == 'ER_NO_SUCH_TABLE') || (err.code == 'SQLITE_ERROR' && err.errno == '1' )) {
                const createTable = require(`../db/${this.table}/create_table`);
                await createTable();
                await this.database(this.table).insert(object);
                const id = await this.database(this.table).select('id').max('id');
    
                return id;
            } else {
                console.log('Error en método save: ', err);
            }
        }
    }

    // Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(number) {
        try {
            const object = await this.database(this.table).select('*').where('id', '=', number);
            return object ? object : null;
        } catch (err) {
            if ((err.code == 'ER_NO_SUCH_TABLE') || (err.code == 'SQLITE_ERROR' && err.errno == '1' )) {
                const createTable = require(`../db/${this.table}/create_table`);
                return null;
            } else {
                console.log('Error en método getById: ', err);
            }
        }
    }

    // Devuelve un array con los objetos presentes en el archivo actual
    async getAll() {
        try {
            const objects = await this.database.from(this.table).select('*');
            return objects;
        } catch (err) {
            // Si la tabla no existe, la crea
            if ((err.code == 'ER_NO_SUCH_TABLE') || (err.code == 'SQLITE_ERROR' && err.errno == '1' )) {
                const createTable = require(`../db/${this.table}/create_table`);
                await createTable();
                return [];
            } else {
                console.log('Error en método getAll: ', err);
            }
        }
    }

    // Elimina del archivo el objeto con el id buscado.
    async deleteById(number) {
        try {
            await this.database.from(this.table).where('id', '=', number).del();
        } catch (err) {
            console.log('Error en método deleteById: ', err);
        }
    }

    // Elimina todos los objetos de la tabla
    async deleteAll() {
        try {
            await this.database.from(this.table).del();
        } catch (err) {
            console.log('Error en método deleteAll: ', err);
        }
    }
}

module.exports = {
    Contenedor: Contenedor,
    Producto: Producto,
};