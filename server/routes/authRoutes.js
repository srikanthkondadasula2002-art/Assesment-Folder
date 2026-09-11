const express = require('express');
const router = express.Router();
const { loginOrRegister, refreshToken, getMe, addAddress, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginOrRegister);
router.post('/refresh', refreshToken);
router.get('/me', protect, getMe);
router.post('/addresses', protect, addAddress);
router.post('/logout', logout);

module.exports = router;
