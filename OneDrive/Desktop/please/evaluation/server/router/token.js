"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenController_1 = require("../controller/tokenController");
const tokenRouter = (0, express_1.Router)();
// tokenRouter.post('/verify/authenticate');
tokenRouter.post('/refresh', tokenController_1.refreshToken);
exports.default = tokenRouter;
