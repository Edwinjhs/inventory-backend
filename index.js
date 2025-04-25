import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Configuración única de CORS
const whitelist = [
	"http://localhost:5173", // desarrollo local
	"https://arelatam.netlify.app", // tu dominio real en Netlify
];

const corsOptions = {
	origin(origin, callback) {
		// Permite peticiones sin encabezado Origin (p.ej. Postman)
		if (!origin || whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("No permitido por CORS"));
		}
	},
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};

app.use(cors(corsOptions)); // Usa CORS en todas las rutas
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
