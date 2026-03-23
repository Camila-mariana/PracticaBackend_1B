//array de metodos
const branchesController = {};
//import el schema de la coleccion q vamos a utilizar
import branchesModels from "../models/branches.js";
//select
branchesController.getBranches = async (req, res) => {
    const branches = await branchesModels.find()
    res.json(branches)
};
//insert
branchesController.insertBranches = async (req, res) => {
    //#1 Solicito los datos a guardar
    const {name, address, schedule, isActive} = req.body;
    //#2 Lleno una instacia de mi Schema
    const newBranches = new branchesModels({name, address, schedule, isActive})
    //#3 Guardo en la base de datos
    await newBranches.save()

    res.json({message: "branches saved"})
};
//delete
branchesController.deleteBranches = async (req, res) => {
    await branchesModels.findByIdAndDelete(req.params.id);
    res.json({message: "branches deleted"});
};
//actualizar 
branchesController.updateBranches = async (req, res) => {
    const {name, address, schedule, isActive} = req.body;
    await branchesModels.findByIdAndUpdate(req.params.id, {
        name, 
        address, 
        schedule, 
        isActive,
    }, {new:true});
    res.json({message: "branches updated"})
};

export default branchesController;