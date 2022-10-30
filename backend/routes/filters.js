const express = require('express');
const { sortByPrice, sortBySubject } = require('../controllers/filterController');

const router = express.Router();

router.get('/subject', sortBySubject)

router.get('/price', sortByPrice)

module.exports = router;
