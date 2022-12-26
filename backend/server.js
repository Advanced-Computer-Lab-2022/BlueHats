require('dotenv').config();
var cors = require('cors')

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/courses');
const problemRoutes = require('./routes/problem');
const adminRoutes = require('./routes/admin'); 
const instructorRoutes = require('./routes/instructor');
const corporateTraineeRoutes = require('./routes/corporateTrainee'); 
const indTraineeRoutes = require('./routes/indTrainee'); 
const filterRoutes = require('./routes/filters')
const requestedCoursesRoutes = require('./routes/requestedCourses')
const reviewsRoutes = require('./routes/reviews')


// express app
const app = express();
app.use(cors())
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
app.use('/api/problem', problemRoutes);

//app.use('/api/instructors', instRoutes); 
app.use('/filterBy', filterRoutes)
app.use('/api/requestCourse',requestedCoursesRoutes)
app.use('/api/reviews',reviewsRoutes)

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