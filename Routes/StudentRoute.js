const express = require('express');
const router = express.Router();
import express from 'express'


//student login
router.post('/login',login);

//search for an instructor by subject
router.get('/search',searchInstructor);

//access the Google evaluation form
router.get('/evaluate/:instructorId',accessEvaluationForm);

//handle student logout
router.post('/logout',logout);

module.exports = router;
