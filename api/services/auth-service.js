'use strict';

const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const {jwtToken} = require('../config');
const userRepository = require('../repositories/user-repository');

// PRIVATE and PUBLIC key
const privateKEY = fs.readFileSync('./private.key', 'utf8');
const publicKEY = fs.readFileSync('./public.key', 'utf8');

class AuthService {

    async login(data) {
        const user = await userRepository.getUserByEmail(data.email);
        if(user && await _compareHash(data.password, user.password)){
            const options = {
                issuer: 'SHK',
                subject: 'DritonNaserBerisha@gmail.com',
                audience: 'http://localhost:4200'
            }
            const payload = {
                user
            }
            return this.sign(payload, options);
        }
        throw Error("Wrong email or password");
    }

    /**
     * @param payload
     * @param options
     * @param options.issuer
     * @param options.subject
     * @param options.audience
     * @returns {*}
     */
    sign(payload, options) {
        var signOptions = {
            issuer: options.issuer,
            subject: options.subject,
            audience: options.audience,
            expiresIn: jwtToken.expiresIn,    // 12 h validity
            algorithm: jwtToken.algorithm
        };
        return jwt.sign(payload, privateKEY, signOptions);
    }

    /**
     * @param token
     * @param options
     * @param options.issuer
     * @param options.subject
     * @param options.audience
     * @returns {*}
     */
    verify(token, options) {
        /*
         vOption = {
          issuer: "Authorization/Resource/This server",
          subject: "iam@user.me",
          audience: "Client_Identity" // this should be provided by client
         }
        */
        var verifyOptions = {
            issuer: options.issuer,
            subject: options.subject,
            audience: options.audience,
            expiresIn: jwtToken.expiresIn,
            algorithm: [jwtToken.algorithm]
        };
        try {
            return jwt.verify(token, publicKEY, verifyOptions);
        } catch (err) {
            return false;
        }
    }

    /**
     * @param token
     * @returns {payload}
     * @returns null
     */
    decode(token) {
        return jwt.decode(token, {complete: true});
        //returns null if token is invalid
    }
}

/**
 * @param plainPassword
 * @param hashedPassword
 * @return {Promise<any>}
 * @private
 */
const _compareHash = (plainPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hashedPassword, function(error, result) {
            if(error) reject(error);
            resolve(result);
        });
    });
}
module.exports = new AuthService();