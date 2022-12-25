const express = require('express');
const { filterByPrice, filterBySubject,getSubjects } = require('../controllers/filterController');

const router = express.Router();

router.get('/subject', filterBySubject)

router.get('/price', filterByPrice)

router.get('/subjects',getSubjects)

module.exports = router;
