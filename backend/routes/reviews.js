const express = require('express')

const {  getReviews,
    getReview,
  //  addReview,
    deleteReview,
    editReview,
    viewCourseReviews
  } = require('../controllers/reviewsController')
    

const router = express.Router()

router.get('/', getReviews);


router.get('/:id', getReview);


// router.post('/', addReview);


router.delete('/:id', deleteReview);


router.patch('/:id', editReview);



router.get('/viewall/:id', viewCourseReviews);

module.exports = router