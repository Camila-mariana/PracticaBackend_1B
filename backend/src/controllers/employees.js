//array de metodos
const employeesController = {};
//import el schema de la coleccion q vamos a utilizar
import employeesModels from "../models/employees.js";
//select
employeesController.getEmployees = async (req, res) => {
  const employees = await employeesModels.find().populate();
  res.json(employees);
};
//insert
employeesController.insertEmployees = async (req, res) => {
  //#1 Solicito los datos a guardar
  const { name, lastName, salary, dui, phone, email, password, idBranches } =
    req.body;
  //#2 Lleno una instacia de mi Schema
  const newEmployee = new employeesModels({
    name,
    lastName,
    salary,
    dui,
    phone,
    email,
    password,
    idBranches,
  });
  //#3 Guardo en la base de datos
  await newEmployee.save();
  res.json({ message: "employee saved" });
};
//delete
employeesController.deleteEmployees = async (req, res) => {
  await employeesModels.findByIdAndDelete(req.params.id);
  res.json({ message: "employee deleted" });
};
//actualizar
employeesController.updateEmployees = async (req, res) => {
  const { name, lastName, salary, dui, phone, email, password, idBranches } = req.body;
  await employeesModels.findByIdAndUpdate(
    req.params.id,
    {
      name,
      lastName,
      salary,
      dui,
      phone,
      email,
      password,
      idBranches,
    },
    { new: true },
  );
  res.json({ message: "employee updated" });
};

export default employeesController;
