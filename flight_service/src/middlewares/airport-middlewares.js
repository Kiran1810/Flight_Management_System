const {StatusCodes} =require('http-status-codes');

const{ErrorResponse}= require('../utils/common');
const AppError =require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message='something went wrong';
        ErrorResponse.error=new AppError(['name not found in the oncoming request'])
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.code){
        ErrorResponse.message='something went wrong';
        ErrorResponse.error=new AppError(['code not found in the oncoming request'])
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.cityId){
        ErrorResponse.message='something went wrong';
        ErrorResponse.error=new AppError(['cityId not found in the oncoming request'])
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}
module.exports={
    validateCreateRequest}