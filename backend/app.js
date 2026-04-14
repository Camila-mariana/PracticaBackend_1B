import express from "express";
import productsRoutes from "./src/routes/products.js";
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js";
import reviewsRoutes from "./src/routes/reviews.js"
import customersRoutes from "./src/routes/customer.js";
import registerCustomer from "./src/routes/registerCustomer.js";
import registerEmployee from "./src/routes/registerEmployee.js";
import registerAdmin from "./src/routes/registerAdmins.js";
import cookieParser from "cookie-parser";
import loginCustomer from "./src/routes/loginRoutes.js";

//Constante que guarda express
const app = express();

//Aceptar json 
app.use(express.json())
app.use(cookieParser());
app.use("/api/products", productsRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/clients" , customersRoutes);
app.use("/api/registerCustomers", registerCustomer);
app.use("/api/registerEmployee", registerEmployee);
app.use("/api/registerAdmin", registerAdmin);
app.use("/api/login", loginCustomer)


export default app;
