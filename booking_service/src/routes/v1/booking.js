const express = require('express');
const { BookingController } = require('../../controllers');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Booking routes
 */

/**
 * @swagger
 * /api/v1/booking:
 *   post:
 *     summary: Create a new flight booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flightId:
 *                 type: string
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [booked, cancelled, initiated, pending]
 *               noOfSeats:
 *                 type: integer
 *               totalCost:
 *                 type: integer
 *             required:
 *               - flightId
 *               - userId
 *               - status
 *               - noOfSeats
 *               - totalCost
 *     responses:
 *       200:
 *         description: Booking created successfully
 */

router.post('/', BookingController.createBooking);

/**
 * @swagger
 * /api/v1/booking/payments:
 *   post:
 *     summary: Make a payment for a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: header
 *         name: x-idempotency-key
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique key to ensure idempotent payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalCost:
 *                 type: number
 *               userId:
 *                 type: string
 *               bookingId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *       400:
 *         description: Payment failed or bad request
 */
router.post('/payments', BookingController.makePayments);

module.exports = router;
