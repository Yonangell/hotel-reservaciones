import express, { Router } from "express";

import {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  checkAvailability,
} from "../controller/room.controller.js";

const router = express.Router();

router.get("/availability", checkAvailability);
router.post("/", createRoom);
router.get("/", getRooms);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export default router;