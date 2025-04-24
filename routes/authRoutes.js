import { Router } from "express";
import { register, login, test } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/auth.js"; // Importación faltante

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/test", test);
router.get("/verify", requireAuth, (req, res) => {
	res.json(req.user);
});

export default router;
