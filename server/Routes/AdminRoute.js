const express = require ("express");
const router = express.Router();
import express from 'express'

//ADMIN ROUTES

//Admin Login
router.post('/login',login);

//Viewing Profile
router.get('/profile', viewProfile);

//Add evaluation form
router.post('/evaluation/create', createEvaluation);

//Route to generate link for evaluations
router.post('/evaluation/generate-link', generateLink);

//Route to view ratings from student evaluations
router.get('/ratings', viewRatings);

module.exports = router;