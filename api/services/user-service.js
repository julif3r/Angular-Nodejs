const bcrypt = require('bcrypt');
const {password} = require('../config');
const userRepository = require('../repositories/user-repository');

class UserService {

    async createUser(user) {
        user.password = await _hashPassword("123456");
        return await userRepository.createUser(user);
    }

    async deleteUser(userId) {
        return await userRepository.deleteUser(userId);
    }

    async getUser(userId) {
        return await userRepository.getUser(userId);
    }

    async fetchUsers() {
        return await userRepository.fetchUsers();
    }

    async updateUser(user, userId) {
        user.password = await this._hashPassword(user.password);
        return await userRepository.updateUser(user, userId);
    }
}

/**
 * @param data password to be hashed
 * @return {Promise<any>}
 * @private
 */
const _hashPassword = (data) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(data, password.saltRounds, function (error, hash) {
            if (error) reject(error);
            resolve(hash);
        });
    })
}

module.exports = new UserService();