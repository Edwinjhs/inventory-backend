import { Router } from "express";
import {
	getWarehouses,
	createWarehouse,
} from "../controllers/warehouseController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();

// Ruta solo para admins
router.get(
	"/admin/warehouses",
	requireAuth,
	requireRole("admin"),
	getWarehouses
);

// Ruta para usuarios país
router.get(
	"/warehouses",
	requireAuth,
	(req, res, next) => {
		if (req.user.role !== "country")
			return res.status(403).json({ error: "Acceso denegado" });
		next();
	},
	getWarehousesByCountry
);
