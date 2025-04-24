import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
	try {
		const { email, password, role, country} = req.body;
		    if (!email || !password) {
					return res
						.status(400)
						.json({ error: "Email y contraseña son requeridos" });
				}

		// Validación de usuario existente
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "El usuario ya existe" });
		}

		// Crear usuario
		const user = await User.create({
			email,
			password: await bcrypt.hash(password, 12),
			role,
			country: role === "country" ? country : null,
		});

		// Generar JWT
		const token = jwt.sign(
			{ userId: user._id, role: user.role, country: user.country },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.status(201).json({ token, userId: user._id });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const test = async (req, res) => {
	console.log("prueba")
}
export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ error: "Credenciales inválidas" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ error: "Credenciales inválidas" });
		}

		const token = jwt.sign(
			{ userId: user._id, role: user.role, country: user.country },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.json({ token, userId: user._id, role: user.role });
	} catch (error) {
		console.error("Error en registro:", error); // Log detallado
    res.status(500).json({ error: error.message });
	}
};
