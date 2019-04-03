const mysql = require('mysql');
const config = require('../config');
const bcrypt = require('bcrypt');

async function addStockUser(){

    try{
        const connection = mysql.createConnection(config.database);
        const tableName = 'users';
        const user = {
            email: 'admin@gmail.com',
            fistName: 'Admin',
            lastName: 'Admin',
            password: await _hashPassword("123456")
        };

        const sql = `INSERT INTO ${tableName} (email, first_name, last_name, password) VALUES ('${user.email}', '${user.fistName}', '${user.lastName}', '${user.password}')`;
        connection.query(sql, (error, data) => {
            if (error) {
                console.error("I FAILED", error);
                process.exit();
                return 0;
            }
            console.log("SUCCESSFULL", data);
            process.exit();
            return 1;
        });
    }catch (error) {
        console.error("ERROR", error);
        process.exit();
        return 0;
    }

}

/**
 * @param data password to be hashed
 * @return {Promise<any>}
 * @private
 */
const _hashPassword = (data) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(data, config.password.saltRounds, (error, hash) => {
            if (error) reject(error);
            resolve(hash);
        });
    });
};


addStockUser();

