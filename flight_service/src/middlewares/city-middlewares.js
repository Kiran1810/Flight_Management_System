const {StatusCodes} =require('http-status-codes');

const{ErrorResponse}= require('../utils/common');
const AppError =require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message='something went wrong IN CREATING the city';
        ErrorResponse.error=new AppError(['name not found in the oncoming request in the city'],StatusCodes.BAD_REQUEST)
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}
module.exports={
    validateCreateRequest
}