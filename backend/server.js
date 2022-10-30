require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courses');
const filterRoutes = require('./routes/filters')

// express app
const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/courses', courseRoutes);
app.use('/sortBy', filterRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        // listen for requests
        app.listen(port, () => {
            console.log('Listening on port', port);
        });
    })
    .catch((error) => {
        console.log(error);
    })