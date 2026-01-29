import express from "express";
import { getStatistics } from "../controllers/AdminController.mjs";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management endpoints
 */

/**
 * @swagger
 * /api/admin/statistics:
 *   post:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Statistics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     messages:
 *                       type: number
 *                       example: 10
 *                     orders:
 *                       type: number
 *                       example: 25
 *                     menuItems:
 *                       type: number
 *                       example: 50
 *                     categories:
 *                       type: number
 *                       example: 6
 *                     reservations:
 *                       type: number
 *                       example: 14
 *       500:
 *         description: Server error
 */
router.get("/statistics",authMiddleware,isAdmin, getStatistics);

export default router;
