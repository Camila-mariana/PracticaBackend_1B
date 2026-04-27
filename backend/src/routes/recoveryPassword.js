import express from "express";
import recoveryPassword from "../controllers/recoveryPassword.js";

const router = express.Router();

router.route("/resquestCode").post(recoveryPassword.requestCode);
router.route("/verifyCode").post(recoveryPassword.verifyCode);
router.route("/newPassword").post(recoveryPassword.newPassword);

export default router;
