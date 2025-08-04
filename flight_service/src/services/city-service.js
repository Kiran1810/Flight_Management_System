const{StatusCodes}= require('http-status-codes');
const {CityRepository}=require('../repositories');
const AppError =require('../utils/errors/app-error');


const cityRepository = new CityRepository();
async function createCity(data){
    try{
        const city= await cityRepository.create(data);
        return city;
        }
        catch(error){
            
        if(error.name='SequelizeValidationError'){
            let explanation =[];
            error.errors.forEach((err)=>{
              explanation.push( err.message) ;
            }) ;
                  
             throw new AppError(explanation,StatusCodes.BAD_REQUEST );
        }
        throw new AppError('cannot create a new city object',StatusCodes.INTERNAL_SERVER_ERROR );
    
        }}
        async function destroyCity(id){
          try{
              const response =await cityRepository.destroy(id);
         
         return response;
       }
          catch(error){
              if(error.statusCode== StatusCodes.NOT_FOUND)
              {throw new AppError('city u requested is not present',error.statusCode)
          }
          throw new AppError('cannot fetch data of the city which u have asked',StatusCodes.INTERNAL_SERVER_ERROR); 
      
  }
      }
module.exports={
  createCity,destroyCity

}