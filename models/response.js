const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    userResponse: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
