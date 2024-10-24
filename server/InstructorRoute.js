import express from 'express'
const router = express.Router();
// import{postInstructorlogin,postRegisteration}


//Instructor Login
router.post('/login',Instructorlogin);

//Instructor Register
router.post('/register',postRegisteration);

//View Profile
router.get('/profile', getProfile);

//Add Instructor Information
router.post('/evaluation_form', postInformation);

//View the list of evaluation
router.get('/evaluation_form', getEvaluationForm);

//View the comment section
router.get('/evaluation_form', getCommentsection);