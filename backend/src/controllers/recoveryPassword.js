import JsonWebToken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

import { config } from "../../config.js";

import customerModel from "../models/customers.js";
import HTMLRecoveryEmail from "../utils/sendMailRecovery.js";

const recoveryPassword = {};

((recoveryPassword.requestCode = async (req, res) => {
  try {
    //Solicitar datos
    const { email } = req.body;

    //validar que el correo si exista en la base
    const userFound = await customerModel.findOne({ email });

    if (!userFound) {
      return res.status(404).json({ message: "user not found" });
    }
    //codigo aleatorio
    const randomCode = crypto.randomBytes(3).toString("hex");
    //guardamos todo en un toquen
    const token = JsonWebToken.sign(
      //datos a guardar
      { email, randomCode, userType: "customer", verified: false },
      //clave secreta
      config.jwt.secret,
      //cuando expira
      { expiresIn: "15m" },
    );
    res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000 });
    //enviar por correo el codigo

    //quien lo envia
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.email,
        pass: config.email.password,
      },
    });
    //mailOptions -> quien y como lo envia
    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Codigo de recuperacion",
      body: "El codigo expira en 15 minutos",
      html: HTMLRecoveryEmail(randomCode),
    };
    //enviar el correo
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send("Error al enviar el correo");
      }
      return res.status(200).send("Correo enviado con éxito");
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
}),
  (recoveryPassword.verifyCode = async (req, res) => {
    try {
      const { code } = req.body;
      //obtenemos la informacion que esta dentro del token, accedemos a la cookie
      const token = req.cookies.recoveryCookie;
      const decoded = JsonWebToken.verify(token, config.jwt.secret);
      //comparamos los codigos
      if (code !== decoded.randomCode) {
        return res.status(400).json({ message: "Invalid code" });
      }
      //si lo escribe bien, saldra omg si beba
      const newToken = JsonWebToken.sign(
        { email: decoded.email, userType: "customer", verified: true },
        config.jwt.secret,
        { expiresIn: "15m" },
      );

      res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000 });
      return res.status(200).json({ message: "Code verified successfully" });
    } catch (error) {
      console.log("error" + error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }));

recoveryPassword.newPassword = async (req, res) => {
  try {
    const { newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "password doesnt match" });
    }
    const token = req.cookies.recoveryCookie;
    const decoded = JsonWebToken.verify(token, config.jwt.secret);
    if (!decoded.verified) {
      return res.status(400).json({ message: "Code not verified" });
    }
    //Encriptar
    const passwordHash = await bcrypt.hash(newPassword, 10);
    //actualizar contraseña en la base de datos
    await customerModel.findOneAndUpdate(
      { email: decoded.email },
      { password: passwordHash },
      { new: true },
    );

    res.clearCookie("recoveryCookie");
    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default recoveryPassword;
