import express from "express";

import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
} from "../controller/client.controller.js";

const router = express.Router();

router.post("/", createClient);
router.get("/", getClients);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;
