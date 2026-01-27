import express from "express";
import { createReservation, getReservations } from "../controllers/ReservationController.mjs";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reservation
 *   description: Reservation management
 */

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a reservation
 *     tags: [Reservation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - date
 *               - time
 *               - guests
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: "+20123456789"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-30"
 *               time:
 *                 type: string
 *                 example: "19:30"
 *               guests:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Bad request / Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */
router.post("/", createReservation);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations (Admin only)
 *     tags: [Reservation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reservation'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 */
router.get("/", authMiddleware, isAdmin, getReservations);

export default router;
