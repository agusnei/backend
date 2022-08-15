import { productDAO } from "../DAO/productDAO.js"

const getAllProductsController = async (req, res) => {
    const { user } = req.session
    const products = await productDAO.getAll()

    res.render("plantillaProducts.ejs", { user, products })
}

const getOneProductController = async (req, res) => {
    const { id } = req.params
    const { user } = req.session
    const products = await productDAO.getById(id)

    res.render("plantillaProducts.ejs", { user, products })
}

export { getAllProductsController, getOneProductController }