const logoutController = {}

logoutController.logout = async (req, res) => {
    //Limpiar la cookie q tiene la info del usuario
    res.clearCookie("authCookie");

    return res.status(200).json({message: "Sesion cerrada"});
};

export default logoutController;