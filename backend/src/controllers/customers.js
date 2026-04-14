import { json } from "express";
import customersModels from "../models/customers.js";

const customersController = {};

customersController.getCustomers = async (req, res) => {
  try {
    const customers = await customersModels.find();
    res.status(200).json(customers);
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

customersController.updateCustomers = async (req, res) => {
  try {
    let {
      name,
      lastName,
      birthDate,
      email,
      password,
      isVerified,
      LoginAttempts,
      timeOut,
    } = req.body;

    //Validaciones
    name = name?.trim();
    email = email?.trim();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fields required" });
    }

    if (birthDate > new Date() || birthDate < new Date("1901-01-01")) {
      return res.status(400).json({ message: "Invalid date" });
    }

    const customersUpdated = await customersModels.findByIdAndUpdate(
      req.params.id,
      {
        name,
        lastName,
        birthDate,
        email,
        password,
        isVerified,
        LoginAttempts,
        timeOut,
      },
      { new: true },
    );

    if (!customersUpdated) {
      return res.status(400).json({ message: "Customer not found" });
    }
    return res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

customersController.deleteCustomer = async (req, res) => {
  try {
    const deleteCustomer = customersModels.findByIdAndDelete(req.params.id);

    if (!deleteCustomer) {
      return res.status(400).json({ message: "Customer not found" });
    }
    return res.status(200).json({ message: "Customer deleted" });
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default customersController;