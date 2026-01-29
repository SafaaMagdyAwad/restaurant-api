import express from "express";
import { cancelReservation, createReservation, getReservations, updateReservation } from "../controllers/ReservationController.mjs";
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
/**
 * @swagger
 * /api/reservations/{id}/admin:
 *   put:
 *     summary: Admin update reservation status
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, cancelled]
 *                 example: confirmed
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 reservation:
 *                   $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Reservation not found
 */
router.put("/:id/admin",authMiddleware,isAdmin,updateReservation);
/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: User cancel reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *                 example: "I want to cancel my reservation"
 *     responses:
 *       200:
 *         description: Reservation cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 reservation:
 *                   $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Reservation not found
 */

router.put("/:id",cancelReservation);
/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65a1b2c3d4e5f6a7b8c9d0e1"
 *         customerName:
 *           type: string
 *           example: "Safaa Magdy"
 *         phone:
 *           type: string
 *           example: "0551234567"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-01-29T00:00:00.000Z"
 *         time:
 *           type: string
 *           example: "08:30"
 *         guests:
 *           type: integer
 *           example: 4
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *           example: "pending"
 *         notes:
 *           type: string
 *           example: "Anniversary"
 *         price:
 *           type: number
 *           example: 140
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export default router;
