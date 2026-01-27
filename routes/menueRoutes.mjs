import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.mjs";
import { upload } from "../middlewares/upload.mjs";
import {
  addMenuItem,
  getMenu,
  updateMenuItem,
  deleteMenuItem,
  getMenuItem
} from "../controllers/MenueController.mjs";
import { validateRequest } from "../middlewares/valodateRequest.mjs";
import {
  addMenuItemValidation,
  updateMenuItemValidation
} from "../validators/menueValidator.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Restaurant Menu APIs (QR Menu)
 */

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu]
 *     description: Fetch all menu items for QR menu
 *     responses:
 *       200:
 *         description: Menu fetched successfully
 */
router.get("/", getMenu);

/**
 * @swagger
 * /api/menu/{id}:
 *   get:
 *     summary: Get single menu item
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu item fetched successfully
 *       404:
 *         description: Menu item not found
 */
router.get("/:id", getMenuItem);

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Add new menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 */
router.post(
  "/",
  authMiddleware,
  isAdmin,
  upload.single("image"),
  addMenuItemValidation,
  validateRequest,
  addMenuItem
);

/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: Update menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Menu item not found
 */
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  updateMenuItemValidation,
  validateRequest,
  updateMenuItem
);

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Menu item not found
 */
router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  deleteMenuItem
);

export default router;
