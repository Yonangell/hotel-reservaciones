import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";

// importar rutas
import clientRoutes from "./src/routes/client.routes.js";
import roomRoutes from "./src/routes/room.routes.js";
import reservationRoutes from "./src/routes/reservation.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexion base de datos

connectDB();

// Endpoints Globales

app.use("/api/clients", clientRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`📡 Servidor corriendo en http://localhost:${PORT}`);
});
