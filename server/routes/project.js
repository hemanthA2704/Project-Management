const express = require('express');
const router = express.Router();
const requireLoginteacher = require('../middleware/requireloginteacher');
const requireLoginstudent = require('../middleware/requireloginstudent');
const projectController = require('../controllers/project');

router.get('/teacher/projectdetails/:id', requireLoginteacher, projectController.projectdetail);

router.get('/student/projectdetails/:id', requireLoginstudent, projectController.projectdetail);

router.put('/addstudent/:id', requireLoginteacher, projectController.addstudent);

router.put('/addPoints/:id', requireLoginteacher, projectController.addPoints);

router.delete('/deletestudent/:id', requireLoginteacher, projectController.deletestudent);

router.put('/addanswerfile/:id', requireLoginstudent, projectController.addAnswerfile);

router.delete('/deleteanswerfile/:id', requireLoginstudent, projectController.deleteAnswerfile);

router.put('/addquestionfile/:id', requireLoginteacher, projectController.addQuestionfile);

router.delete('/deletequestionfile/:id', requireLoginteacher, projectController.deleteQuestionfile);

router.put('/submit/:id', requireLoginstudent, projectController.submit);

router.put('/unsubmit/:id', requireLoginstudent, projectController.unSubmit);

module.exports = router;