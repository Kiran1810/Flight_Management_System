const express = require('express');

const { CityController } = require('../../controllers');

const router = express.Router();

/**
 * @swagger
 * /cities:
 *   post:
 *     summary: Create a new city
 *     tags: [Cities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: City created successfully
 */
router.post('/',CityController.createCity);

/**
 * @swagger
 * /cities/{id}:
 *   delete:
 *     summary: Delete a city by ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: City deleted successfully
 */
router.delete('/:id',CityController.destroyCity);
module.exports=router;
