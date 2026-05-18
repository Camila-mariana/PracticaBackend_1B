import providersModel from "../models/providers.js";
import { v2 as cloudinary } from "cloudinary";

//Array de funciones
const providerController = {};

providerController.getAllProviders = async (req, res) => {
  try {
    const providers = await providersModel.find();
    return res.status(200).json(providers);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//insert
providerController.insertProvider = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const newProvider = new providersModel({
      name,
      phone,
      image: req.file.path,
      public_id: req.file.filename,
    });
    await newProvider.save();
    return res.status(200).json({ message: "saved" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//update
providerController.updateProvider = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const providerFound = await providersModel.findById(req.params.id);
    const updataData = {
      name,
      phone,
    };

    if (req.file) {
      await cloudinary.uploader.destroy(providerFound.public_id);
      updataData.image = req.file.path;
      updataData.public_id = req.file.filename;
    }
    await providersModel.findByIdAndUpdate(req.params.id, updataData, {
      new: true,
    });
    return res.status(200).json({ message: "provider updates" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

providerController.deleteProvider = async (req, res) => {
  try {
    const providerFound = await providersModel.findById(req.params.id);
    await cloudinary.uploader.destroy(providerFound.public_id);
    await providersModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "provider deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default providerController;