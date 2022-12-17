const express = require('express');
const { filterByPrice, filterBySubject,getSubjects} = require('../controllers/filterController');

const router = express.Router();

router.get('/subject/:subject', filterBySubject)

router.get('/price/:price', filterByPrice)

router.get('/subject/:subject/price/:price', filterByPrice)

router.get('/subjects', getSubjects)


module.exports = router;
