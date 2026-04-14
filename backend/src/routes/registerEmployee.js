import express from 'express';
import controller from '../controllers/registerEmployee.js';
const router = express.Router();
router.route('/')
.post(controller.post)
router.route('/verify')
.post(controller.verify)
export default router;