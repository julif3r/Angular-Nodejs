const express = require('express');
const router = express.Router();
const userService = require('../services/user-service');

router.get('/', async (request, response) => {
    try {
        console.log("USER", request.user);
        const result = await userService.fetchUsers();
        response.json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.get('/:userId', async (request, response) => {
    try {
        const result = await userService.getUser(request.params.userId);
        response.json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.post('/', async (request, response) => {
    try {
        const result = await userService.createUser(request.body);
        response.json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.put('/:userId', async (request, response) => {
    try {
        const result = await userService.updateUser(request.body, request.params.userId);
        response.json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.delete('/:userId', async (request, response) => {
    try {
        const result = await userService.deleteUser(request.params.userId);
        response.json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});


module.exports = router;