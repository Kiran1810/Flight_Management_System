const { StatusCodes } = require('http-status-codes');
const { Op } = require("sequelize");

const { Booking } = require('../models');
const CrudRepository = require('./crud-repository');
const {Enums} = require('../utils/common');
//const { CANCELLED, BOOKED } = Enums.BOOKING_STATUS;

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async createBooking(data, transaction) {
        const response = await Booking.create(data, {transaction: transaction});
        return response;
    } 
    
    
  async get(id, transaction) {
    return await Booking.findByPk(id, { transaction });
  }

  async update(id, updateData, transaction) {
    await Booking.update(updateData, { where: { id }, transaction });
    return await Booking.findByPk(id, { transaction });
  }
}


    module.exports= BookingRepository