const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireloginstudent');
const studentController = require('../controllers/student');
const projectController = require('../controllers/project');


router.get('/studentmyprojects', requireLogin, studentController.myProjects);

router.put('/studentcomment', requireLogin, studentController.comment);

module.exports = router;