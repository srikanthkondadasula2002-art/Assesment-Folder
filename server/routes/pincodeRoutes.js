const express = require('express');
const router = express.Router();
const { checkPincode } = require('../controllers/pincodeController');

router.get('/:code', checkPincode);

module.exports = router;
