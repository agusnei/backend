import knex from 'knex'

class Contenedor{
    constructor(config, tableName){
        this.config = config,
        this.tableName = tableName
    }

    async postProduct(req){
        try {
            await knex(this.config)(this.tableName).insert(req)
            console.log("Producto agregado a la db!")
            knex(this.config).destroy()
        } catch (error) {
            console.log(`Ocurrio un error al guardar. El error fue: ${error}`)
            knex(this.config).destroy()
        }
    }

    async getAll(){
        try {
            const prodcutsFromDatabase = await knex(this.config).from(this.tableName).select('*')
            knex(this.config).destroy()
            return prodcutsFromDatabase

        } catch (error) {
            console.log(`Ocurrio un error al leer archivo. El error fue: ${error}`)
            knex(this.config).destroy()
        }
    }

}

export default Contenedor