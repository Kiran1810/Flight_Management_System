const CrudRepository=require('./crud-repositry.js');
const{Airplane}=require('../models');

class AirplaneRepository extends CrudRepository{
    constructor(){
        super(Airplane);
    }
}

module.exports =AirplaneRepository;