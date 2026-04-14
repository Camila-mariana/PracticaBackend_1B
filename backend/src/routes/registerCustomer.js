import express from 'express';
import controller from '../controllers/registrerCustomer.js';
const router = express.Router();
router.route('/')
.post(controller.post)
router.route('/verify')
.post(controller.verify)
export default router;