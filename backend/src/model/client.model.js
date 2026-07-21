import mongoose from "mongoose";

const clientShema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Client", clientShema);
