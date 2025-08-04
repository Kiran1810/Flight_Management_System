const { StatusCodes } = require('http-status-codes');

const { UserService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


/**
 * POST : /signup 
 * req-body {email: 'a@b.com', password: '1234'}
 */
async function signup(req, res) {
    try {
        const user = await UserService.create({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.data = user;
        console.log("user",user);
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function signin(req, res) {
    try {
        const user = await UserService.signIn({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}
async function role(req, res) {
    try {
        const user = await UserService.addRoleToUser({
           role : req.body.role,
           id : req.body.id
        });
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


async function getAllUser(req,res){
  

    try{
    
           const user=await UserService.findUser(req.query);
           SuccessResponse.data=user;
         
           return res
               .status(StatusCodes.CREATED)
               .json(SuccessResponse)
    }
   
    catch(error){
       
       ErrorResponse.error=error;
       
       return res
               .status(error.statusCode )
               .json(ErrorResponse)
   
    }}


    async function getUserById(req, res) {
  try {
    const user = await UserService.getUserById(req.params.id); // Call to service layer
    SuccessResponse.data = user;

    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}




module.exports = {
    signup, signin,role,getAllUser,getUserById
  
}