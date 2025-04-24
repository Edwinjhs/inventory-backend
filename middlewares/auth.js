import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		// 1. Verificar existencia del token
		if (!token) {
			return res.status(401).json({ error: "Autenticación requerida" });
		}

		// 2. Verificar y decodificar token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// 3. Buscar usuario en BD (¡Nueva mejora!)
		const user = await User.findById(decoded.userId);
		if (!user) {
			return res.status(401).json({ error: "Usuario no existe" });
		}

		// 4. Adjuntar datos actualizados del usuario
		req.user = {
			userId: user._id,
			email: user.email,
			role: user.role,
			country: user.country,
		};

		next();
	} catch (error) {
		// Manejar diferentes tipos de errores
		const message =
			error.name === "TokenExpiredError" ? "Token expirado" : "Token inválido";

		res.status(401).json({ error: message });
	}
};

// Middleware de roles (se mantiene igual)
export const requireRole = (role) => {
	return (req, res, next) => {
		if (req.user.role !== role) {
			return res.status(403).json({ error: "Acceso no autorizado" });
		}
		next();
	};
};
