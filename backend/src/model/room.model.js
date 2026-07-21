import mongoose from "mongoose";

const roomShema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    type: {
      type: String,
      required: true,
      enum: ["individual", "doble", "suite"],
    },
    princePerNight: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Room", roomShema);
