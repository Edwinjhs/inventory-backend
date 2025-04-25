import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Configuración única de CORS
const corsOptions = {
	origin: [
		"http://localhost:5173", // dev local
		"https://tu-frontend.onrender.com", // producción
	],
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};
app.use(cors(corsOptions));                  // Aplica CORS a todas las rutas
app.options('*', cors(corsOptions)); 
app.use(express.json());

// Conectar a MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Conectado a MongoDB"))
	.catch((err) => console.error("Error de conexión:", err));

// Ruta de prueba
app.get("/", (req, res) => {
	res.send("API de Gestión de Inventario");
});
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Servidor en puerto ${PORT}`);
});
