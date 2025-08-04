const express = require('express');

const { AirportController } = require('../../controllers');
const{AirportMiddlewares} = require('../../middlewares');
const router = express.Router();

/**
 * @swagger
 * /airports:
 *   post:
 *     summary: Create a new airport
 *     tags: [Airports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               address:
 *                 type: string
 *               cityId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Airport created successfully
 */
router.post('/',AirportMiddlewares.validateCreateRequest,AirportController.createAirport);

/**
 * @swagger
 * /airports:
 *   get:
 *     summary: Get all airports
 *     tags: [Airports]
 *     responses:
 *       200:
 *         description: List of airports retrieved successfully
 */
router.get('/',AirportController.getAirports);

/**
 * @swagger
 * /airports/{id}:
 *   get:
 *     summary: Get an airport by ID
 *     tags: [Airports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Airport details retrieved successfully
 */
router.get('/:id',AirportController.getAirport);

/**
 * @swagger
 * /airports/{id}:
 *   delete:
 *     summary: Delete an airport by ID
 *     tags: [Airports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Airport deleted successfully
 */
router.delete('/:id',AirportController.destroyAirport);
module.exports=router;