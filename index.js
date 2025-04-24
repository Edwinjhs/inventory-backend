import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Servidor en puerto ${PORT}`);
});
