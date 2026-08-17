import Reservation from "../model/reservation.model.js";

export const createReservation = async (req, res) => {
  const { startDate, endDate, room, client } = req.body;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validación 1: Fecha de salida posterior a la entrada
    if (end <= start) {
      return res
        .status(400)
        .json({
          message: "La fecha de salida debe ser posterior a la de entrada",
        });
    }

    // Validación 2: Habitación ya ocupada en ese rango de fechas
    const overlap = await Reservation.findOne({
      room,
      $or: [{ startDate: { $lt: end }, endDate: { $gt: start } }],
    });

    if (overlap) {
      return res
        .status(400)
        .json({
          message:
            "La habitación ya se encuentra reservada para las fechas seleccionadas",
        });
    }

    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("client")
      .populate("room");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateReservation = async (req, res) => {
  const { startDate, endDate, room } = req.body;
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return res
        .status(400)
        .json({
          message: "La fecha de salida debe ser posterior a la de entrada",
        });
    }

    // Comprobar solapamiento ignorando la reservación que estamos editando actualmente
    const overlap = await Reservation.findOne({
      _id: { $ne: req.params.id },
      room,
      $or: [{ startDate: { $lt: end }, endDate: { $gt: start } }],
    });

    if (overlap) {
      return res
        .status(400)
        .json({
          message: "La habitación ya está ocupada en ese nuevo horario",
        });
    }

    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Reservación no encontrada" });
    res.json({ message: "Reservación cancelada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CONSULTA AVANZADA: Obtener las reservaciones de un cliente específico
export const getReservationsByClient = async (req, res) => {
  try {
    const clientReservations = await Reservation.find({
      client: req.params.clientId,
    })
      .populate("room")
      .populate("client");
    res.json(clientReservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
