import express from "express";
import Router from "./src/routes/products.js";

//Constante que guarda express
const app = express();

//Aceptar json 
app.use(express.json())

app.use("/api/products", Router)

export default app;
