import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ error: "Autenticación requerida" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ error: "Token inválido o expirado" });
	}
};

export const requireRole = (role) => {
	return (req, res, next) => {
		if (req.user.role !== role) {
			return res.status(403).json({ error: "Acceso no autorizado" });
		}
		next();
	};
};
