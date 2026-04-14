import express from 'express';
import controller from '../controllers/clients.js';
const router = express.Router();
router.route('/')
.get(controller.get)
router.route('/:id')
.put(controller.put)
.delete(controller.delete);
export default router;