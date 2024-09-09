const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireloginteacher');
const teacherController = require('../controllers/teacher');

router.post('/createproject', requireLogin, teacherController.create);
router.get('/teachermyprojects', requireLogin, teacherController.myProjects);
router.put('/teachercomment', requireLogin, teacherController.comment);

module.exports = router;