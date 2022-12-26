const express = require('express');
const { createCourse, getCourses, getCourse, deleteCourse, updateCourse } = require('../controllers/courseController');
const { getCoursesBySearch } = require('../controllers/search');
const { coursePayment, requestRefund, getRefundRequests, getWallet, getCourseName, getTraineeName, getCoursePrice } = require('../controllers/payment');

const router = express.Router();

// Get all courses 
router.get('/', getCourses);

// Get a single course
router.get('/:id', getCourse);

// Post a new course
router.post('/', createCourse);

// Delete a course
router.delete('/:id', deleteCourse);

// Update a course
router.patch('/:id', updateCourse);

// Search a course 
router.get('/search/:key', getCoursesBySearch); 

// Pay for a course
router.post('/payment', coursePayment); 

// Request Refund a course payment
router.post('/requestRefund', requestRefund); 

// Get all refunds
router.put('/getRefundRequests', getRefundRequests);

// Get refund course name
router.put('/getCourseName', getCourseName);

// Get refund trainee name
router.put('/getTraineeName', getTraineeName);

// Get refund course price
router.put('/getCoursePrice', getCoursePrice);



// Get user wallet
router.put('/wallet', getWallet);

module.exports = router;