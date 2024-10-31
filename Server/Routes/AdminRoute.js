const express = require ("express");
const router = express.Router();
const AdminController = require ('../Controller/AdminController')
import { login, profile, createEvaluation, generateLink, viewRatings  } from "../Controller/AdminController.js";

                //ADMIN ROUTES

//Admin Login
router.post('/login',AdminController.login);

//Viewing Profile
router.get('/profile', AdminController.profile);

//Add evaluation form
router.post('/evaluation/create', AdminController.createEvaluation);

//Route to generate link for evaluations
router.post('/evaluation/generate-link', AdminController.generateLink);

//Route to view ratings from student evaluations
router.get('/ratings', AdminController.viewRatings);

module.exports = router;