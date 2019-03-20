
const userRepository = require('../repositories/user-repository');

class UserService {
    async fetchUsers(){
        return await userRepository.fetchUsers();
    }
}

module.exports = new UserService();