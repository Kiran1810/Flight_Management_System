const CrudRepository=require('./crud-repositry.js');
const{Airport}=require('../models');

class AirportRepository extends CrudRepository{
    constructor(){
        super(Airport);
    }
}
module.exports =AirportRepository;