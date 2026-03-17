import express from "express";
import Products from "./src/routes/products.js";

//Constante que guarda express
const app = express();

//Aceptar json 
app.use(express.json());

app.use("/api/products")

export default app;
