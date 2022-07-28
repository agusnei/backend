import ContenedorMongo from '../../contenedores/ContenedorMongo.js';

class CarritoDaoMongo extends ContenedorMongo {
    constructor() {
        super('carritos', {
            timestamp: { type: String, required: true },
            productos: { type: Array, required: true},
        });
    }

    async addProduct(cart, object) {
        // ADD producto al carrito.
        try {
            cart.productos.push(object);

            await this.coleccion.findByIdAndUpdate(cart.id, { productos: cart.productos }, function (err, doc) {
                if (err) {
                  throw 'findByIdAndUpdateError';
              }}).clone()

        } catch(err) {
            console.log('Error en método addProduct: ', err);
        }
    }

    async removeProduct(cart, object) {
        // Remueve un producto del carrito.
        const productos = cart.productos.filter(producto => producto._id != object._id);

        await this.coleccion.findByIdAndUpdate(cart.id, { productos: productos }, function (err, doc) {
            if (err) {
              throw 'findByIdAndUpdateError';
          }}).clone()
    }
    
    async getProductById(cart, id_product) {
        // Recibe un id y devuelve el objeto con ese id, o null si no está.
        try {
            const object = cart.productos.find(object => object._id == id_product);
            return object ? object : null;
        } catch (err) {
            console.log('Error en método getProductById: ', err);
        }
    }
}

export default CarritoDaoMongo;