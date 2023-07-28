const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // You might need to install this package using npm/yarn
const { faker } = require('@faker-js/faker');
const app = express();
const PORT = process.env.PORT || 5000;

const Form = require('./models/form');
const Question = require('./models/question');
const Response = require('./models/response');

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors()); // Allow cross-origin requests

// Database connection
const MONGODB_URI = 'mongodb+srv://adtjha1:jAJ3DBjLG65KGp5r@formbuilder.2mlnin7.mongodb.net/'; // Replace with your MongoDB URI
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// db.once('open', () => {
//     console.log('Connected to MongoDB');

//     // Function to create dummy forms and questions
//     const createDummyData = async () => {
//         try {
//             // Create 5 dummy forms
//             for (let i = 0; i < 5; i++) {
//                 const form = await Form.create({
//                     title: faker.lorem.words(3),
//                     description: faker.lorem.sentence(),
//                     headerImage: faker.image.url(),
//                 });

//                 // Create 3 dummy questions for each form
//                 for (let j = 0; j < 3; j++) {
//                     const question = await Question.create({
//                         type: faker.helpers.arrayElement(['Categorize', 'Cloze', 'Comprehension']),
//                         content: faker.lorem.sentence(),
//                         image: faker.image.url(),
//                     });

//                     // Add the question to the form's questions array
//                     form.questions.push(question);
//                     await form.save();
//                 }
//             }

//             console.log('Dummy data created successfully!');
//             // Close the database connection after creating the dummy data
//             db.close();
//         } catch (error) {
//             console.error('Error creating dummy data:', error);
//             // Close the database connection on error
//             db.close();
//         }
//     };

//     // Call the function to create dummy data
//     createDummyData();
// });

// Routes
const formRoutes = require('./routes/formRoutes');
const questionRoutes = require('./routes/questionRoutes');
const responseRoutes = require('./routes/responseRoutes');


app.use('/api', formRoutes);
app.use('/api', questionRoutes);
app.use('/api', responseRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
