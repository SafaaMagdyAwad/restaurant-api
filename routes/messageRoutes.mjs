import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.mjs";
import { getAllMessages, readMessage, sendMessage } from "../controllers/MessageController.mjs";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Contact messages management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65b12c1f9d1a4c0012345678"
 *         name:
 *           type: string
 *           example: "Safaa"
 *         email:
 *           type: string
 *           example: "safaa@gmail.com"
 *         subject:
 *           type: string
 *           example: "Need help"
 *         message:
 *           type: string
 *           example: "Hello, I need help with..."
 *         read:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           example: "2025-01-28T10:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           example: "2025-01-28T10:00:00.000Z"
 *
 *     SendMessageInput:
 *       type: object
 *       required:
 *         - email
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           example: "Safaa"
 *         email:
 *           type: string
 *           example: "safaa@gmail.com"
 *         subject:
 *           type: string
 *           example: "Question"
 *         message:
 *           type: string
 *           example: "I want to ask about..."
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a message (Contact us)
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendMessageInput'
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Message sent successfully
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages (Admin only)
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Messages list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 results:
 *                   type: number
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Read message by ID (Admin only) + mark as read
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65b12c1f9d1a4c0012345678"
 *     responses:
 *       200:
 *         description: Message fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message not found
 */


router.route('/')
    .get(authMiddleware,isAdmin,getAllMessages)
    .post(sendMessage);
router.route('/:id')
    .get(authMiddleware,isAdmin,readMessage)
    


export default router;
