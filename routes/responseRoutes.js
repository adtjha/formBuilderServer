const express = require('express');
const router = express.Router();
const Response = require('../models/response');

// Save user responses to a form question
router.post('/responses', async (req, res) => {
    try {
        const { form, question, userResponse } = req.body;
        const response = await Response.create({ form, question, userResponse });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Failed to save the response.' });
    }
});

module.exports = router;
