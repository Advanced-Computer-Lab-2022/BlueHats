const express = require('express')

const {  getReviews,
    getReview,
  //  addReview,
    deleteReview,
    editReview,
    viewCourseReviews,
    viewCorporateReviews,
    viewIndividualReviews
  } = require('../controllers/reviewsController')
    

const router = express.Router()

router.get('/', getReviews);


router.get('/:id', getReview);


// router.post('/', addReview);


router.delete('/:id', deleteReview);


router.patch('/:id', editReview);


router.get('/viewcReviews/:id', viewCorporateReviews);
router.put('/viewiReviews', viewIndividualReviews);


router.get('/viewall/:id', viewCourseReviews);

module.exports = router