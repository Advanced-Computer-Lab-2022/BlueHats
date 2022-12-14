const express = require('express');
const { filterByPrice, filterBySubject,getSubjects} = require('../controllers/filterController');

const router = express.Router();

router.get('/subject/:subject', filterBySubject)

router.get('/price/:price', filterByPrice)

router.get('/subject/:subject/price/:price', filterByPrice)

module.exports = router;
