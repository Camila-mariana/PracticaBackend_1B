//array de metodos
const productsController = {};

//import el schema de la coleccion q vamos a utilizar
import productsModel from "../models/products.js";

//select
productsController.getProducts = async (req, res) => {
  const products = await productsModel.find();
  res.json(products);
};

//insert
productsController.insertProducts = async (req, res) => {
  //#1 Solicito los datos a guardar
  const { name, description, price, stock } = req.body;
  //#2 Lleno una instacia de mi Schema
  const newProduct = new productsModel({ name, description, price, stock });
  //#3 Guardo en la base de datos
  await newProduct.save();

  res.json({ message: "Product Saved" });
};

//delete
productsController.deleteProducts = async (req, res) => {
  await productsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

//actualizar
productsController.updateProducts = async (req, res) => {
  const { name, description, price, stock } = req.body;
  await productsModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      stock,
    },
    { new: true },
  );
  res.json({ message: "product updated" });
};

productsController.getProductsById = async (req, res) => {
  try {
    const producto = await productsModel.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "product not found" });
    }
    return res.status(200).json(producto);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

productsController.getLowStock = async (req, res) => {
  try {
    const productos = await productsModel.find({ stock: { $lt: 5 } });
    if (!productos) {
      return res
        .status(404)
        .json({ message: "there are no products with low stock" });
    }
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

productsController.getProductsByPriceRange = async (req, res) => {
  try {
    const { min, max } = req.body;
    const products = await productsModel.find({
      price: { $gte: min, $lte: max },
    });
    if (!products) {
      return res
        .status(404)
        .json({ message: "not products with this price range" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

productsController.countProducts = async (req, res) => {
  try {
    const count = await productsModel.countDocuments();
    return res.status(200).json(count);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

productsController.searchByName = async (req, res) => {
  try {
    const { name } = req.body;
    const products = await productsModel.find({
      name: { $regex: name, $options: i },
    });
    if (!products) {
      return res.status(404).json({ message: "not found product" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default productsController;
