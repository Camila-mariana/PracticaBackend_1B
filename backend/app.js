import express from "express";
import productsRoutes from "./src/routes/products.js";
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js";
import reviewsRoutes from "./src/routes/reviews.js"
import customersRoutes from "./src/routes/customer.js";


//Constante que guarda express
const app = express();

//Aceptar json 
app.use(express.json())

app.use("/api/products", productsRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/clients" , customersRoutes);
app.use("/api/registerCustomers",);


export default app;
