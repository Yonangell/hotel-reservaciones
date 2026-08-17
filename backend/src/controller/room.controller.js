import Room from "../model/room.model.js";
import Reservation from "../model/reservation.model.js";

export const createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedRoom)
      return res.status(404).json({ message: "Habitación no encontrada" });
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom)
      return res.status(404).json({ message: "Habitación no encontrada" });
    res.json({ message: "Habitación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CONSULTA AVANZADA: Disponibilidad de habitaciones por rango de fechas
export const checkAvailability = async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res
      .status(400)
      .json({ message: "Faltan los parámetros start y end (YYYY-MM-DD)" });
  }

  try {
    const startCheck = new Date(start);
    const endCheck = new Date(end);

    // 1. Encontrar reservaciones conflictivas en esas fechas
    const conflictingReservations = await Reservation.find({
      $or: [{ startDate: { $lt: endCheck }, endDate: { $gt: startCheck } }],
    }).distinct("room");

    // 2. Traer las habitaciones que NO estén en esa lista conflictiva
    const availableRooms = await Room.find({
      _id: { $nin: conflictingReservations },
    });
    res.json(availableRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
