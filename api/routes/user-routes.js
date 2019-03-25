const express = require('express');
const router = express.Router();
const userService = require('../services/user-service');

router.get('/', async function (request, response) {
    try {
        const result = await userService.fetchUsers();
        response.json(result);
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.get('/:userId', async function (request, response) {
    try {
        const result = await userService.getUser(request.params.userId);
        response.json(result);
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.post('/', async function (request, response) {
    try {
        const result = await userService.createUser(request.body);
        response.json(result);
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.put('/:userId', async function (request, response) {
    try {
        const result = await userService.updateUser(request.body, request.params.userId);
        response.json(result);
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.delete('/:userId', async function (request, response) {
    try {
        const result = await userService.deleteUser(request.params.userId);
        response.json(result);
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});


module.exports = router;