
const userRepository = require('../repositories/user-repository');

class UserService {

    async createUser(user){
        return await userRepository.createUser(user);
    }

    async deleteUser(userId){
        return await userRepository.deleteUser(userId);
    }

    async getUser(userId){
        return await userRepository.getUser(userId);
    }

    async fetchUsers(){
        return await userRepository.fetchUsers();
    }

    async updateUser(user, userId){
        return await userRepository.updateUser(user, userId);
    }
}

module.exports = new UserService();