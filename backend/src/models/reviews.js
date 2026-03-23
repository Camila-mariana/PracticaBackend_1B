import { Schema, model } from "mongoose";

const employeesSchema = new Schema(
  {
    idEmployee: {
      type: Schema.Types.ObjectId,
      ref: "employees",
    },
    idProducts: {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("reviews", employeesSchema);
