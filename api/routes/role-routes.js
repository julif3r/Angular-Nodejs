const express = require('express');
const router = express.Router();
const roleService = require('../services/role-service');

router.get('/', async (request, response) => {
    try {
        const result = await roleService.fetchRoles();
        response.json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.get('/:roleId/claims', async (request, response) => {
    try {
        const result = await roleService.fetchRoleClaims(request.params.roleId);
        response.json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});

router.post('/', async (request, response) => {
    try {
        const result = await roleService.createRole(request.body);
        response.json({data: result});
    } catch (error) {
        console.error('I FAILED', error);
        response.status(500).json({ message: 'Something broke!' });
    }
});



module.exports = router;