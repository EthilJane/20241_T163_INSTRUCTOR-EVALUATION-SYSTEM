const express = require('express');
const router = express.Router();
import express from 'express'

//Instructor Login
router.post('/login',login);

//View Profile
router.get('/profile', viewProfile);

//Add Instructor Information
router.post('/evaluation_form', Information);

//View the list of evaluation
router.get('/evaluations', viewEvaluation);

module.exports = router; 