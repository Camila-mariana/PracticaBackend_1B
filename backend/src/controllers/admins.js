import model from '../models/admins.js';
const controller = {
    get: async (req, res) => {
        try {
            const clients = await model.find();
            res.status(200).json(clients);
        } catch (error) {
            res.status(500).json({
                message: 'error retrieving admins',
                error: error.message
            });
        }
    },
    delete: async (req, res) => {
        try {
            const admin = await model.findByIdAndDelete(req.params.id);
            if (!admin) {
                return res.status(404).json({
                    message: 'admin not found'
                });
            }
            return res.status(200).json({
                message: 'admin deleted'
            });
        } catch (error) {
            res.status(500).json({
                message: 'error deleting admin',
                error: error.message
            });
        }
    },
    put: async (req, res) => {
        try {
            let {
                name, lastname, email, password, isVerified, timeout
            } = req.body;
            name = name?.trim();
            email = email?.trim();
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: 'fields required'
                });
            }
            const admin = await model.findByIdAndUpdate(
                req.params.id, {
                name, lastname, email, password, isVerified, timeout
            }, {
                new: true
            });
            if (!admin) {
                return res.status(404).json({
                    message: 'admin not found'
                });
            }
            return res.status(200).json({
                message: 'admin updated',
                admin
            });
        } catch (error) {
            res.status(500).json({
                message: 'error updating admin',
                error: error.message
            });
        }
    }
};
export default controller;