const CrudRepository = require('./crud-repository');
const { Role } = require('../models');

class RoleRepository extends CrudRepository {
  constructor() {
    super(Role);
  }

  async getRoleByName(name) {
    try {
      const role = await Role.findOne({ where: { name } });

      if (!role) {
        // Optional: Throw a meaningful error or return null, depending on how you handle it in the service
        console.warn(`Role with name "${name}" not found.`);
        return null;
      }

      return role;
    } catch (error) {
      console.error('Error fetching role by name:', error);
      throw error;
    }
  }
}

module.exports = RoleRepository;
