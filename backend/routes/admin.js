import express from "express";
import { getAllOrders, getAllUsers } from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/orders", authMiddleware, adminMiddleware, getAllOrders);
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

export default router;
