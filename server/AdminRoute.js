import express from 'express'
const router = express.Router();

//Admin Login
router.post('/login',adminlogin)

//Viewing Profile
router.get('/profile', auth, viewProfile)

//Admin route to add Evaluation form details
router.post('/evaluation_form', auth, addEvaluationForm)