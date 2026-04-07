import express from "express";
import customersController from "../controllers/customers.js"; 

const router = express.Router();

router
.route("/")
.get(customersController.getCustomers); 

router
.route("/:id")
.put(customersController.updateCustomers)
.delete(customersController.deleteCustomer);

export default router;  