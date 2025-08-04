const express = require('express');

const { FlightController } = require('../../controllers');
const{FlightMiddlewares} = require('../../middlewares');

const router = express.Router();

/**
 * @swagger
 * /flights:
 *   post:
 *     summary: Create a new flight
 *     tags: [Flights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flightNumber:
 *                 type: string
 *               airplaneId:
 *                 type: integer
 *               departureAirportId:
 *                 type: string
 *               arrivalAirportId:
 *                 type: string
 *               departureTime:
 *                 type: string
 *               arrivalTime:
 *                 type: string
 *               price:
 *                 type: number
 *               boardingGate:
 *                 type: string
 *               totalSeats: 
 *                 type: number
 *     responses:
 *       201:
 *         description: Flight created successfully
 */
router.post('/',FlightMiddlewares.validateCreateRequest,FlightController.createFlight);

/**
 * @swagger
 * /flights:
 *   get:
 *     summary: Get all flights
 *     tags: [Flights]
 *     responses:
 *       200:
 *         description: List of all flights
 */
router.get('/',FlightController.getAllFlights);

/**
 * @swagger
 * /flights/{id}:
 *   get:
 *     summary: Get flight by ID
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Flight details
 */
router.get('/:id',FlightController.getFlight);

/**
 * @swagger
 * /flights/{id}/seats:
 *   patch:
 *     summary: Update available seats in a flight
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seats:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Seats updated successfully
 */
router.patch('/:id/seats',FlightMiddlewares.validateUpdateSeatsRequest,FlightController.updateSeats)

module.exports=router;
