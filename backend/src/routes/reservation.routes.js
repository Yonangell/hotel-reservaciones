import express, { Router } from "express";

import {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
  getReservationsByClient,
} from "../controller/reservation.controller.js";
import { deleteClient } from "../controller/client.controller.js";

const router = express.Router();

router.get("/client/:clientId", getReservationsByClient);
router.post("/", createReservation);
router.get("/", getReservations);
router.put("/:id", updateReservation);
router.delete("/:id", deleteClient);

export default router;
