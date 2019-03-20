const BaserRepository = require('./base-repository');
const usersTableName = 'users';

class UserRepository extends BaserRepository {
    async fetchUsers() {
        const sql = `SELECT * FROM ${usersTableName}`;
        return await this.query(sql);
    }
}

module.exports = new UserRepository();