"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authetication_1 = require("../controller/authetication");
const router = (0, express_1.Router)();
router.post('/verify', authetication_1.verifyAuthentication);
// router.get('/gmail', verifyUser);
exports.default = router;
