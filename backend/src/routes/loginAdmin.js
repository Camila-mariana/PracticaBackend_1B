import express from "express";
import loginAdmin from "../controllers/loginAdmin.js";

const router = express.Router();

router.route("/").post(loginAdmin.login);

export default router;
