import express from 'express'
const router = express.Router();

//Instructor Login
router.post('/login',Instructorlogin);

//Instructor Register
router.post('/register',Instructorlogin)

//View Profile
router.get('/profile', auth, InstructoProfile)

//Add Instructor Information
router.post('/evaluation_form', auth, addEvaluationForm)

//View the list of evaluation
router.get('/evaluation_form', auth, addEvaluationForm)

//View the comment section
router.get('/evaluation_form', auth, addEvaluationForm)