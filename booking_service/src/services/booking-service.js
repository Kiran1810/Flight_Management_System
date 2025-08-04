const axios = require('axios');
const {StatusCodes} = require('http-status-codes');

const { BookingRepository } = require('../repositories');
const { ServerConfig,queue} = require('../config')
const db = require('../models');
const AppError = require('../utils/errors/app-error');
const {Enums} = require('../utils/common');
const { BOOKED, CANCELLED } = Enums.BOOKING_STATUS;

const bookingRepository = new BookingRepository();

async function createBooking(data) {
    
    const transaction = await db.sequelize.transaction();
    try {
    
        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
        console.log(flight);
        const flightData = flight.data.data;
        if(data.noOfSeats > flightData.totalSeats) {
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }
        const totalBillingAmount = data.noOfSeats * flightData.price;
        const bookingPayload = {...data, totalCost: totalBillingAmount};
        const booking = await bookingRepository.create(bookingPayload, transaction);

        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`, {
            seats: data.noOfSeats
        });
    
        await transaction.commit();
        return booking;
    } catch(error) {
        console.log(error)
        await transaction.rollback();
        throw error;
    }
    
}

async function makePayment(data){
    const transaction= await db.sequelize.transaction()
try{
     
    const BookingDetails=await bookingRepository.get(data.bookingId,transaction)
    console.log(BookingDetails.status,"status")
      if (!BookingDetails) {
      throw new AppError('Booking not found', StatusCodes.NOT_FOUND);
    }
    if(BookingDetails.totalCost!=data.totalCost ){
        throw new AppError('Not paid required amount', StatusCodes.BAD_REQUEST);
    }
    if(BookingDetails.status==CANCELLED){
        throw new AppError(' your booking is expired', StatusCodes.BAD_REQUEST);
    }
    
    const bookingTime= new Date(BookingDetails.createdAt);
    const currentTime=new Date();
    if(currentTime-bookingTime>60 * 60 * 1000){
      
       await cancelBooking(data.bookingId)
        throw new AppError('booking time is out!!', StatusCodes.BAD_REQUEST);
       
    }
    if(BookingDetails.userId!=data.userId){
        throw new AppError('Unauthorized user', StatusCodes.BAD_REQUEST);
    }
     await bookingRepository.update(data.bookingId, {status:BOOKED},transaction)

     console.log("before");     
     const userResponse = await axios.get(`${ServerConfig.USER_SERVICE}/api/v1/user/${data.userId}`);
       const userData = userResponse.data.data;
    const email = userData.email;;
     console.log(email)

    console.log("after");
    
    if(email){
     queue.sendData({
        receipentEmail:email,
        subject:"Flight booked",
        text:`congratulations!! your booking is done successfully for the BookingId ${data.bookingId}`,
       });
    }

    await transaction.commit(); 
     return { message: 'Payment successful & booking confirmed' };
   
    
   
}
catch(error){
   
    await transaction.rollback();
   
    throw error;
}

}


 async function cancelBooking(bookingId){
    const transaction= await db.sequelize.transaction()
try{
    const BookingDetails=await bookingRepository.get(bookingId,transaction)
    if(!BookingDetails || BookingDetails.status==CANCELLED){
        return true;
        }
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${BookingDetails.flightId}/seats`, {
            seats: BookingDetails.noOfSeats,
            dec:false

        })
            await bookingRepository.update(bookingId, {status:CANCELLED},transaction)
           await transaction.commit();
            return true;


}
catch(error){
    await transaction.rollback();
    throw error;

}
 }

module.exports= {createBooking,makePayment,cancelBooking}