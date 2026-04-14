import express from "express";
import loginCustomer from "../controllers/loginCustomer.js";

const router = express.Router();

router.route("/").post(loginCustomer.login);

export default router;
