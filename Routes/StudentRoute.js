const express = require('express');
const router = express.Router();
const StudentController =require('../Controller/StudentController')
import { login, confirmation, firstpage, secondpage, thirdpage, fourthpage, fifthpage, sixthpage, seventhpage } from '../Controller/AdminController';


//Access the link provided through email
// router.get('/getlink', accessLink);

//student login 
router.post('/login',StudentController.login);

//Confirmation as a student before to proceed
router.post('/confirmation/id', StudentController.confirmation)

//Fill out the first page
router.post('/fillout1st_page',StudentController.firstpage);

//Lesson Presentation rating
router.post('/Lesson_Presentation',StudentController.secondpage);

//Management of Learning rating 
router.post('/Management_of_learning',StudentController.thirdpage);

//Innovativeness and Creativity
router.post('/Innovative_Creativity',StudentController.fourthpage);

//Mastery of the Subject Matter
router.post('/Mastery_of_the_Subject',StudentController.fifthpage);

//Assessment of learning
router.post('/Assessment_learning',StudentController.sixthpage);

//Comments
router.post('/Comments_Suggestions',StudentController.seventhpage);

module.exports = router;
