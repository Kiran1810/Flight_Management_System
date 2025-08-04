const CrudRepository=require('./crud-repositry.js');
const{City}=require('../models');

class CityRepository extends CrudRepository{
    constructor(){
        super(City);
    }
}
module.exports =CityRepository;