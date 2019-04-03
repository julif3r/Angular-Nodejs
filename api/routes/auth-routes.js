const express = require('express');
const router = express.Router();
const authService = require('../services/auth-service');

router.post('/login', async function (request, response) {
    try {
        const result = await authService.login(request.body);
        response.json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

module.exports = router;