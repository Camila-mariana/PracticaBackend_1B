import express from "express";
import productsController from "../controllers/products.js";

//Router() para colocar los metodos q tendra el endpoint
const router = express.Router();
router.route("/")
.get(productsController.getProducts)
.post(productsController.insertProducts);

router.route("/:id")
.put(productsController.updateProducts)
.delete(productsController.deleteProducts);

export default router;
