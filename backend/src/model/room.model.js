import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    type: {
      type: String,
      required: true,
      enum: ["individual", "doble", "suite"],
    },
    pricePerNight: { type: Number, required: true }, 
  },
  { timestamps: true },
);

export default mongoose.model("Room", roomSchema);