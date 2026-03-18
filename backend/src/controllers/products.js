//array de metodos
const productsController = {};

//import el schema de la coleccion q vamos a utilizar
import productsModel from "../models/products.js";

//select
productsController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
};

//insert
productsController.insertProducts = async (req, res) => {
    //#1 Solicito los datos a guardar
    const {name, description, price, stock} = req.body;
    //#2 Lleno una instacia de mi Schema
    const newProduct = new productsModel({name, description, price, stock})
    //#3 Guardo en la base de datos
    await newProduct.save()

    res.json({message: "Product Saved"})
};

//delete
productsController.deleteProducts = async (req, res) => {
    await productsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Product deleted"});
};

//actualizar 
productsController.updateProducts = async (req, res) => {
    const {name, description, price, stock} = req.body;
    await productsModel.findByIdAndUpdate(req.params.id, {
        name, 
        description, 
        price, 
        stock,
    }, {new:true});
    res.json({message: "product updated"})
};

export default productsController;