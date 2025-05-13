import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// REGISTRO
export const register = async (req, res) => {
	try {
		const { email, password, role, country } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ error: "Email y contraseña son requeridos" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "El usuario ya existe" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await User.create({
			email,
			password: hashedPassword,
			role,
			country: role === "country" ? country : country || null, // puede venir null también
		});

		const token = jwt.sign(
			{ userId: user._id, role: user.role, country: user.country },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.status(201).json({
			token,
			userId: user._id,
			email: user.email,
			role: user.role,
			country: user.country,
		});
	} catch (error) {
		console.error("Error en registro:", error);
		res.status(500).json({ error: error.message });
	}
};

// LOGIN
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
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

		res.json({
			token,
			userId: user._id,
			email: user.email,
			role: user.role,
			country: user.country,
		});
	} catch (error) {
		console.error("Error en login:", error);
		res.status(500).json({ error: error.message });
	}
};

// TEST
export const test = async (req, res) => {
	console.log("prueba");
	res.send("Funciona");
};
