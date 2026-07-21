import mongoose from "mongoose";

const reservationShema = new mongoose.Schema({
  startDate: { type: Date, required: true},
  endDate: { type: Date, required: true},
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true }
}, {timestamps: true});

export default mongoose.model("Reservation", reservationShema);