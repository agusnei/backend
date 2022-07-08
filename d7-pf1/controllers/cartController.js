import Cart from '../class/Cart.js';
// ---------------------------------------complements---
import idGenerator from '../complements/idGenerator.js';
import readDB from '../complements/readDB.js';
import writeDB from '../complements/writeDB.js';
import checkProduct from '../complements/checkProduct.js'
//--------------------------------------------"DataBases"--- 
const cartsDB = './dataBase/carts.txt';
const productsDB = './dataBase/products.txt';
//---------------functions carts--------------------------------------
    export const createCart = async(req, res) =>{
        let {products} = req.body;

        const listCart = await readDB (cartsDB)
        console.log(listCart)
        if(!products){
            products = [];
        }

        const newCart = new Cart(
            idGenerator(),
            Date.now(),
            products
        )

        listCart.push(newCart);

        try {
            await writeDB(cartsDB, listCart)
            return res.json({msg: `Cart created successfully with id: ${newCart.id}`}
            )
        } catch (error) {
            console.log(error);
        }   
    }

//----------------------------------------------------------------------------
    export const deleteCart = async (req, res) =>{
        const {id} = req.params;
        const listCart = await readDB (cartsDB);
        const newlistCart = listCart.filter (cart => cart.id != id)

        if (newlistCart.length === listCart.length) {
            const error = new Error (`Cannot be deleted because the cart with id:${id} does not exist`)
            return res.status(404).json({msg: error.message})
        }

        try {
            await writeDB(cartsDB, newlistCart)
            res.json ({msg: 'Cart deleted successfully'})
        } catch (error) {
            console.log(error)
        }

    }
//----------------------------------------------------------------------------
    export const getCartProducts = async(req, res) =>{
        const { id } = req.params;
        const listCart = await readDB (cartsDB);
        const findCartById = listCart.find(cart => cart.id === id);
        
        if (!findCartById){
            const error = new Error ("Cart not found");
            return res.status(404).json({msg: error.message})
        }

        res.json(findCartById.products);
    }
//----------------------------------------------------------------------------
    export const getCarts = async (req, res) =>{
        const listCart = await readDB (cartsDB);
        res.json(listCart)
    }
//----------------------------------------------------------------------------
    export const addProductInCart = async (req, res) =>{
        const { id, id_prod } = req.params;

        // Obtain products and carts from DDBB
        const listCart = await readDB (cartsDB)
        const listOfProduct = await readDB (productsDB)

        //find the cart and then a product by ID;
        const findCartById = listCart.find(cart => cart.id === id);
        const findProdById = listOfProduct.find(product => product.id === id_prod);

        if(!findCartById || !findProdById){
            const error = new Error ("Something not found");
            return res.status(404).json({msg: error.message});
        }

        //is the product already exist in the cart?
        const checkProductInCart = findCartById.products.some(prod => prod.id === id_prod)

        if (checkProductInCart) {
            const error = new Error ('Product already exist in the cart');
            return res.status(400).json({msg: error.message});
        }

        // Add select product in cart and add cart in the list of carts;
        await findCartById.products.push(findProdById);
        const updateCart = listCart.filter (cart => cart.id != id)
        updateCart.push (findCartById)

        try {
            await writeDB (cartsDB, updateCart)
            res.json({updateCart})
        } catch (error) {
            console.log(error);
        }
    }

//----------------------------------------------------------------------------
    export const deleteProductInCart = async (req, res) =>{
        const { id, id_prod } = req.params;

        // Get lists of carts from database;
        const listCart = await readDB (cartsDB);

        // Find cart by ID;
        const findCartById = listCart.find(cart => cart.id === id);
        
        if(!findCartById){
            const error = new Error ("Cart not found");
            return res.status(404).json({msg: error.message});
        }

        // Check if product is already in cart;
        let cartProducts = findCartById.products

        if(!checkProduct(cartProducts, id_prod)){
            const error = new Error ('Product not found in the cart');
            return res.status(404).json({msg: error.message});
        }

        // Update products;
        cartProducts = cartProducts.filter (product => product.id != id_prod);
        findCartById.products = cartProducts;

        // Update list of carts;
        const updatelistCart = listCart.filter (cart => cart.id != id)
        updatelistCart.push(findCartById);

        try {
            await writeDB(cartsDB, updatelistCart);
            res.json(updatelistCart)
        } catch (error) {
            console.log(error);       
        }
    }

