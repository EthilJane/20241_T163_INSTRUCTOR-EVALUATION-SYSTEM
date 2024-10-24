import express from 'express'
const router = express.Router();

//Admin Login
router.post('/login',adminlogin)

//Viewing Profile
router.get('/profile', getProfile)

//Add evaluation form
router.post('/evaluation_form', postEvaluationForm)