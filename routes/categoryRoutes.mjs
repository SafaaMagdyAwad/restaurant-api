import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.mjs";
import { createCat, deleteCat, getAllCate, getById, getCategoriesWithProducts, updateCat } from "../controllers/categoryController.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65a1b2c3d4e5f67890123456"
 *         name:
 *           type: string
 *           example: "Fast Food"
 *         description:
 *           type: string
 *           example: "All fast food items"
 *         icon:
 *           type: string
 *           example: "🍕"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CategoryCreateRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Fast Food"
 *         description:
 *           type: string
 *           example: "All fast food items"
 *         icon:
 *           type: string
 *           example: "🍔"
 *
 *     CategoryUpdateRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Desserts"
 *         description:
 *           type: string
 *           example: "Sweet meals"
 *         icon:
 *           type: string
 *           example: "🍰"
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryCreateRequest'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Category already exists
 */

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65a1b2c3d4e5f67890123456"
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65a1b2c3d4e5f67890123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryUpdateRequest'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       409:
 *         description: Category name already exists
 */

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65a1b2c3d4e5f67890123456"
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */


router.route('/')
    .get(getAllCate)
    .post(authMiddleware, isAdmin, createCat);
router.get("/with-products", getCategoriesWithProducts);
router.route('/:id')
    .get(getById)
    .put(authMiddleware, isAdmin, updateCat)
    .delete(authMiddleware, isAdmin, deleteCat);


export default router;
