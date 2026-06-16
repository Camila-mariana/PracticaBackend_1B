import AdminModel from "../models/admins.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"; 
import { config } from "../../config.js";

//Array
const loginAdmin = {};
loginAdmin.login = async (req, res) => {
  //#1- solicita los datos
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Correo inválido" });
  }

  try {
    //#1-buscar correo en la base
    const AdminFound = await AdminModel.findOne({ email });

    //Si no existe el correo en la base de datos
    if(!AdminFound){
        return res.status(400).json({message:"Admin not found"})
    }

    //verificar si el usuario esta bloqueado
    if(AdminFound.timeOut && AdminFound.timeOut > Date.now()){
        return res.status(403).json({message: "Cuenta bloqueada"})
    }
    //Validar la contraseña
    const isMatch = await bcrypt.compare(password, AdminFound.password)
    if(!isMatch){
        AdminFound.LoginAttempts = (AdminFound.LoginAttempts || 0) + 1;

        //Si llega a 5 intentos fallidos se bloquea la cuenta
        if(AdminFound.LoginAttempts >=5){
            AdminFound.timeOut = Date.now() + 5 * 60 *1000;
            AdminFound.LoginAttempts = 0;

            await AdminFound.save();
            return res.status(403).json ({message:"Cuenta bloqueada por intetos fallidos"})  
        }

        await AdminFound.save();

        return res.status(401).json({message: "Contraseña incorrecta"})
    }

    //Resetear intentos si login correcto
    AdminFound.LoginAttempts = 0;
    AdminFound.timeOut = null;

    //Generar el token 
    const token = jsonwebtoken.sign(
        //#1- Que datos vamos a guardar
        {id: AdminFound._id, userType: "Admin"}, //tipo de usuario 
        //#2-secret key
        config.jwt.secret,
        //3- cuando expira 
        {expiresIn: "30d"}
    );

    //el token lo guardamos en una cookie
    res.cookie("authCookie", token)

    return res.status(200).json({message: "Login exitoso"})
  } catch (error) {
    console.log("error" + error)
    return res.status(500).json({message: "Internal Server Error"})
  }
};

export default loginAdmin;
