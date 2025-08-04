const express = require('express');

const { AirplaneController } = require('../../controllers');
const {AirplaneMiddlewares} =require('../../middlewares')
const router = express.Router();

/**
 * @swagger
 * /airplanes:
 *   post:
 *     summary: Create a new airplane
 *     tags: [Airplanes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modelNumber:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Airplane created successfully
 */
router.post('/',AirplaneMiddlewares.validateCreateRequest,AirplaneController.createAirplane);

/**
 * @swagger
 * /airplanes:
 *   get:
 *     summary: Get all airplanes
 *     tags: [Airplanes]
 *     responses:
 *       200:
 *         description: List of airplanes
 */
router.get('/',AirplaneController.getAirplanes);

/**
 * @swagger
 * /airplanes/{id}:
 *   get:
 *     summary: Get an airplane by ID
 *     tags: [Airplanes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Airplane details retrieved successfully
 */
router.get('/:id',AirplaneController.getAirplane);

/**
 * @swagger
 * /airplanes/{id}:
 *   delete:
 *     summary: Delete an airplane by ID
 *     tags: [Airplanes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Airplane deleted successfully
 */
router.delete('/:id',AirplaneController.destroyAirplane);

module.exports=router;