import config from '../config.js';
import mongoose from "mongoose";

await mongoose.connect(config.mongodb.connectionString);

class ContenedorMongo {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async getById(id) {
    // Recibe un id y devuelve el objeto con ese id, o null si no está.
    try {
      const objeto = await this.coleccion.findById(id, { __v: 0 });

      return objeto;
     
    } catch (err) {
      console.log('Error en método getById: ', err);
    }
  }

  async getAll() {
    // Devuelve un array con los objetos presentes en el archivo.
    try {
      const docs = await this.coleccion.find({}, { __v: 0 });
      return docs;

    } catch (error) {
      console.log('Error en método getAll: ', error);
      return [];
    }
  }
 
  async save(object) {
    // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    try {
      object.timestamp = new Date(Date.now());

      const newObject = new this.coleccion(object);
      let resultado = await newObject.save();

      return resultado.id;

    } catch(err) {
      console.log('Error en método save: ', err);
    }
  }

  async deleteById(id) {
    // Elimina del archivo el objeto con el id buscado.
    try {
      await this.coleccion.findByIdAndDelete(id, function (err, doc) {
        if (err) {
          throw 'findByIdAndDeleteError';
      }}).clone();
    } catch (err) {
        console.log('Error en método deleteById: ', err);
    }
}

async updateById(id, object) {
    // Actualiza un objeto según su id. 
    try {
      object.timestamp = new Date(Date.now());

      await this.coleccion.findByIdAndUpdate(id, object, function (err, doc) {
        if (err) {
          throw 'findByIdAndUpdateError';
      }}).clone();
    } catch (err) {
        console.log('Error en método updateById: ', err);
    }
}
}

export default ContenedorMongo;