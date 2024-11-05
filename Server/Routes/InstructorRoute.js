const express = require('express');
const router = express.Router();
import express from 'express'

//Instructor Login/functional requirements
router.post('/login',login);

//Register/functional requirements
router.post('/register',register);

//View Profile
router.get('/profile', viewProfile);

//Add Instructor Information/functional requirements
router.post('/evaluation_form', Information);

//View the list of evaluation
router.get('/evaluations', viewEvaluation);

module.exports = router; 