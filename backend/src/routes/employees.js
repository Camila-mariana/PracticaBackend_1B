import express from "express";
import employeesController from "../controllers/employees.js";
//Router() para colocar los metodos q tendra el endpoint
const router = express.Router();
router
.route("/")
.get(employeesController.getEmployees)
.post(employeesController.insertEmployees);

router
.route("/:id")
.put(employeesController.updateEmployees)
.delete(employeesController.deleteEmployees);

export default router;
 