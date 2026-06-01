import express from "express";
import deliveryDriversController from "../controllers/deliveryDrivers.js";
import updated from "../utils/cloudinaryConfig.js";

const router = express.Router();

router
  .route("/")
  .get(deliveryDriversController.getAllDrivers)
  .post(updated.single("image"), deliveryDriversController.insertDrivers);

router
  .route("/:id")
  .put(updated.single("image"), deliveryDriversController.updateDriver)
  .delete(deliveryDriversController.deleteDriver);

export default router;
