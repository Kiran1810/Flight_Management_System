/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication routes
 */

const express = require('express');
const { UserController } = require('../../controllers');
const { AuthRequestMiddlewares } = require('../../middlewares');
const router = express.Router();

/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/signup', AuthRequestMiddlewares.validateAuthRequest, UserController.signup);
/**
 * @swagger
 * /api/v1/user/signin:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post('/signin', AuthRequestMiddlewares.validateAuthRequest, UserController.signin);

/**
 * @swagger
 * /api/v1/user/role:
 *   post:
 *     summary: Assign a role to a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role assigned
 */
router.post('/role', AuthRequestMiddlewares.checkAuth, AuthRequestMiddlewares.isAdmin, UserController.role);

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", UserController.getAllUser);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user data
 *       404:
 *         description: User not found
 */
router.get("/:id", UserController.getUserById);



module.exports = router;
