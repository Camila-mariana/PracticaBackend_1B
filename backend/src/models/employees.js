import mongoose, { Schema, model } from "mongoose";

const employeesSchema = new Schema ({
    name:{
        type: String
    },
    lastName: {
        type: String
    },
    salary:{
        type: Number
    },
    dui:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    idBranches:{
        type: Schema.Types.ObjectId,
        ref: "branches"
    }
}, {
    timestamps: true,
    strict: false
})

export default model("employees", employeesSchema)