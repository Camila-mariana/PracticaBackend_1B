import express from "express";
import branchesController from "../controllers/branches.js";

//Router() para colocar los metodos q tendra el endpoint
const router = express.Router();
router
.route("/")
.get(branchesController.getBranches)
.post(branchesController.insertBranches);

router
.route("/:id")
.put(branchesController.updateBranches)
.delete(branchesController.deleteBranches);

export default router;

