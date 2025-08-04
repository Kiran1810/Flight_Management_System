const CrudRepository = require('./crud-repository');
const { Api } = require('../models');


class UserRepository extends CrudRepository {
    constructor() {
        super(Api);
    }

    async getUserByEmail(email){
        const res= await Api.findOne({where:{email:email}})
        return res
       }

async getUserById(id) {
    const res = await Api.findByPk(id); // Sequelize's built-in method to get by primary key
    return res;
  }
}

    module.exports = UserRepository;