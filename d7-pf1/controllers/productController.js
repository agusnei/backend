import * as fs from 'fs';
const fsp = fs.promises;
import idGenerator from '../complements/idGenerator.js';
import Product from '../class/Product.js';

//--------------------------------------------"DataBases"--- 
    const productsDB = './dataBase/products.txt';
    const utf = 'utf-8';

// ---------------------------------------complements---
//---read data base 
    const readDB = async () => {
        let db = await fsp.readFile(productsDB, utf);
        if (db == ""){
            db = "[]";
        }
        return JSON.parse(db);
    }

//---write data base
    const writeDB = async (data) => {
        await fsp.writeFile(productsDB, JSON.stringify(data), utf);
    }

//---------------functions products--------------------------------------------------------------
    export const getProducts = async (req, res) => {
        const products = await readDB ();
        return res.json({
            products
        })
    }
//----------------------------------------------------------------------------
    export const addProduct = async (req, res) => {
        const { name, description, code, photo, price, stock } = req.body;
        const listProd = await readDB();
        const newProduct = new Product(
            idGenerator(),
            Date.now(),
            name,
            description,
            code,
            photo, 
            price, 
            stock)
        listProd.push(newProduct);
        try {
            await writeDB(listProd);
            return res.json({
                listProd
            })
        } catch (error) {
            console.log(error);
        }
    }
//----------------------------------------------------------------------------
    export const getProduct = async (req, res) => {
        const {id} = req.params
        const listProd = await readDB();
        const findProdById = await listProd.find(product => product.id === id);
        if (!findProdById){
            const error = new Error(`Product with id:${id} does not exist`)
            return res.status(404).json({ msg: error.message })
        }
        
        res.json(findProdById);
    }
//----------------------------------------------------------------------------
    export const deleteProduct = async (req, res) => {
        const {id} = req.params
        let listProd = await readDB();
        const filterListById = await listProd.filter(product => product.id !== id);
        if (filterListById.length === listProd.length){
            const error = new Error(`Cannot be deleted because the product with id:${id} does not exist`)
            return res.status(404).json({ msg: error.message })
        }

        try {
            await writeDB(filterListById)
            res.json ({msg: 'Product deleted successfully'})
        } catch (error) {
            console.log(error)
        }

    }
//----------------------------------------------------------------------------
    export const updateProduct = async (req, res) => {
        const {id} = req.params; 
        let listProd = await readDB(); 
        const findProdById = await listProd.find (product => product.id === id)

        if(!findProdById){
            const error = new Error (`Cannot be update because the product with id:${id} does not exist`)
            return res.status(404).json({ msg: error.message })
        }

        findProdById.name = req.body.name || findProdById.name;
        findProdById.description = req.body.description || findProdById.description;
        findProdById.code = req.body.code || findProdById.code;
        findProdById.photo = req.body.photo || findProdById.photo;
        findProdById.price = req.body.price || findProdById.price;
        findProdById.stock = req.body.stock || findProdById.stock;

        const newlistProd = await listProd.filter(product => product.id !== id)
        newlistProd.push(findProdById)

        try {
            await writeDB(newlistProd)
            res.json ({newlistProd})
        } catch (error) {
            console.log(error)
        }
    }