import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { getWarehouses } from "../controllers/warehouseController.js";

const router = Router();

// Solo admin ve todas las bodegas
router.get("/admin/warehouses", authMiddleware, adminMiddleware, getWarehouses);

// Usuario país ve solo su bodega
router.get("/warehouses", authMiddleware, (req, res) => {
	if (req.user.role !== "country")
		return res.status(403).json({ error: "Acceso denegado" });
	// Lógica para obtener bodega del país del usuario
});

export default router;
