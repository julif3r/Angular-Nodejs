const express = require('express');
const router = express.Router();
const userService = require('../services/user-service');

router.get('/', async function(request, response) {
    try{
        user = await userService.fetchUsers();
        response.json(user);
    }catch(error){
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

module.exports = router;