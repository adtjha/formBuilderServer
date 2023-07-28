const express = require('express');
const router = express.Router();
const Form = require('../models/form');

// Create a new form
router.post('/forms', async (req, res) => {
    try {
        const { title, description, headerImage, questions } = req.body;
        const form = await Form.create({ title, description, headerImage, questions });
        res.status(201).json(form);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to create the form.' });
    }
});

// Get a list of all forms
router.get('/forms', async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get forms.' });
    }
});

// Get a specific form by ID
router.get('/forms/:formId', async (req, res) => {
    try {
        const form = await Form.findById(req.params.formId);
        if (!form) {
            return res.status(404).json({ message: 'Form not found.' });
        }
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get the form.' });
    }
});

// Update a specific form
router.put('/forms/:formId', async (req, res) => {
    try {
        const { title, description, headerImage } = req.body;
        const updatedForm = await Form.findByIdAndUpdate(
            req.params.formId,
            { title, description, headerImage },
            { new: true }
        );
        res.status(200).json(updatedForm);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update the form.' });
    }
});

// Delete a specific form
router.delete('/forms/:formId', async (req, res) => {
    try {
        const deletedForm = await Form.findByIdAndDelete(req.params.formId);
        res.status(200).json(deletedForm);
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete the form.' });
    }
});

module.exports = router;
