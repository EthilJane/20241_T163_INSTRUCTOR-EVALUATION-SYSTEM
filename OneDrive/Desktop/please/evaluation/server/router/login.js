"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authetication_1 = require("../controller/authetication");
const router = (0, express_1.Router)();
router.post('/gmail', authetication_1.loginGmail);
router.post('/email', authetication_1.loginWithEmail);
router.post('/admin', authetication_1.loginAdmin);
exports.default = router;
