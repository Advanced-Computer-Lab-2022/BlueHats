require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/courses');
const adminRoutes = require('./routes/admin'); 
const instructorRoutes = require('./routes/instructor');
const corporateTraineeRoutes = require('./routes/corporateTrainee'); 
const indTraineeRoutes = require('./routes/indTrainee'); 
const instRoutes = require('./routes/inst');
const filterRoutes = require('./routes/filters')

// express app
const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());

app.use((req, res, next) => 
{
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api/corporateTrainee', corporateTraineeRoutes);
app.use('/api/indTrainee', indTraineeRoutes);
app.use('/api/courses', courseRoutes);

app.use('/api/instructors', instRoutes);
app.use('/sortBy', filterRoutes)


// connect to database
mongoose.connect(process.env.MONGO_URL)
    .then(() => 
    {
        // listen for requests
        app.listen(port, () => {
            console.log('Listening on port', port);
        });
    })
    .catch((error) => 
    {
        console.log(error);
    })