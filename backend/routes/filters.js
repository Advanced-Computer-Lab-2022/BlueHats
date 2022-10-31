const express = require('express');
const { filterByPrice, filterBySubject } = require('../controllers/filterController');

const router = express.Router();

router.get('/subject', filterBySubject)

router.get('/price', filterByPrice)

module.exports = router;
