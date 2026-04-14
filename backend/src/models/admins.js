import { Schema, model } from 'mongoose';
const schema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean
    }
}, {
    timestamps: true,
    strict: false
});
export default model('admins', schema);