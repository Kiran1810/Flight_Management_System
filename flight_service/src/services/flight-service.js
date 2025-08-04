const{StatusCodes}= require('http-status-codes');
const {FlightRepository}=require('../repositories');
const AppError =require('../utils/errors/app-error');
const {Op} = require('sequelize')

const flightRepository = new FlightRepository();

async function createFlight(data){
    try{
      console.log("data",data);
        const flight= await flightRepository.create(data);
        console.log("flights",flight)
        return flight;
      
        }catch(error){
            
        if(error.name=='SequelizeValidationError'){
            let explanation =[];
            error.errors.forEach((err)=>{
              explanation.push( err.message) ;
            }) ;
                   
             throw new AppError(explanation,StatusCodes.BAD_REQUEST );
        }
    
        }
      }

async function getAllFlights(query){
  let customFilter ={};
  const sortFilter=[];
  const endingTripTime = " 23:59:00 ";
  if(query.trips){
    [departureAirportId ,arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId =departureAirportId;
    customFilter.arrivalAirportId= arrivalAirportId;
  }
  if(query.price){
    [minPrice ,maxPrice] = query.price.split("-");
  console.log(minPrice,maxPrice);
    customFilter.price={
    [Op.between]:[minPrice,((maxPrice==undefined)?20000:maxPrice)]
  }}
  if(query.travellers){
    customFilter.totalSeats={
    [Op.gte]:query.travellers
}
  }
  if(query.tripDate){
    customFilter.departureTime={
    [Op.between]:[query.tripDate, query.tripDate + endingTripTime]
}
  }
  if(query.sort){
    const params= query.sort.split(',');
 const sortFilters = params.map((param)=>param.split('_'));
 sortFilter= sortFilters
  }
 
  try{
    const flights= await flightRepository.getAllFlights(customFilter ,sortFilter);
     console.log(customFilter);
    return flights;
    } 
    catch(error){
      console.log(error)
      throw new AppError('cannot fetch the data of all the flight object',StatusCodes.INTERNAL_SERVER_ERROR );
    }
}


async function getFlight(id){
  try{
    const flight= await flightRepository.get(id);
    return flight;
    } 
    catch(error){
      if(error.statusCode==StatusCodes.NOT_FOUND){
        throw new AppError('The flight you requested is not present',error.statusCode);
    } 
      }
      throw new AppError('cannot fetch the data of all the flight',StatusCodes.INTERNAL_SERVER_ERROR );
    } 

async function updateSeats(data){
  try{
    console.log("flightId in booking:", data.flightId);
    const response= await flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec);
    return response;
    } 
    catch(error){
      console.log(error)
      throw new AppError('cannot update the data of the flight',StatusCodes.INTERNAL_SERVER_ERROR );
    } 
      }
      
            module.exports={
            createFlight,getAllFlights,getFlight,updateSeats}