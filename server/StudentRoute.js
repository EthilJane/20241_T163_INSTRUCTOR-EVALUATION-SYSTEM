import express from 'express'
const express = require("express");
const router = express.Router();
// import{}



//Student Signin
router.post('/Signin',Studentsignin);

//Access the Google Evaluiation Form
router.get('/evaluation form', getEvaluationform);

//Fillout the evaluation form
router.put('/Fill in', putFillout);


//Submit the form
router.post('/Submit', postSubmit )