const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/teachersignup',authController.teachersignup);
router.post('/teachersignin',authController.teachersignin);
router.post('/studentsignup',authController.studentsignup);
router.post('/studentsignin',authController.studentsignin);

module.exports = router;