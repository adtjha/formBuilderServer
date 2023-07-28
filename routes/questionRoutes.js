const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Create a new question
router.post('/questions', async (req, res) => {
    try {
        console.log(req.body)
        const { type, content, image } = req.body;
        const question = await Question.create({ type, content, image });
        res.status(201).json(question);
    } catch (error) {
        console.error(error, req.body)
        res.status(500).json({ message: 'Failed to create the question.' });
    }
});

// Get a list of all questions in a form
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get questions.' });
    }
});

// Get a specific question by ID
router.get('/questions/:questionId', async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found.' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get the question.' });
    }
});

// Update a specific question
router.put('/questions/:questionId', async (req, res) => {
    try {
        const { type, content, image } = req.body;
        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.questionId,
            { type, content, image },
            { new: true }
        );
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update the question.' });
    }
});

// Delete a specific question
router.delete('/questions/:questionId', async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.questionId);
        res.status(200).json(deletedQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete the question.' });
    }
});

module.exports = router;
