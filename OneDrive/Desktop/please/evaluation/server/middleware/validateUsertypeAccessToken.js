"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdminAccessToken = exports.checkInstructorAccessToken = void 0;
const constants_1 = require("../utils/constants");
const systemToken_1 = require("../utils/systemToken");
const constant_1 = require("./constant");
const checkInstructorAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let accessToken = req.cookies[constants_1.ACCESS_TOKEN_NAME];
        if (!accessToken)
            return next();
        let tokenTest = (0, systemToken_1.verifySystemToken)(accessToken);
        if (tokenTest.valid && ((_a = tokenTest.payload) === null || _a === void 0 ? void 0 : _a.role) == 'instructor') {
            console.log('instructor access token is valid');
            res.locals[constant_1.LocalResponse.isAccessValid] = true;
            res.locals[constant_1.LocalResponse.email] = tokenTest.payload.email;
            next();
            return;
        }
        throw new Error('instructor invalid token');
    }
    catch (error) {
        console.log('access token is invalid');
        res.locals[constant_1.LocalResponse.isAccessValid] = false;
        next();
    }
});
exports.checkInstructorAccessToken = checkInstructorAccessToken;
const checkAdminAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let accessToken = req.cookies[constants_1.ACCESS_TOKEN_NAME];
        if (!accessToken)
            return next();
        let tokenTest = (0, systemToken_1.verifySystemToken)(accessToken);
        if (tokenTest.valid && ((_a = tokenTest.payload) === null || _a === void 0 ? void 0 : _a.role) == 'admin') {
            console.log('admin access token is valid');
            res.locals[constant_1.LocalResponse.isAccessValid] = true;
            res.locals[constant_1.LocalResponse.email] = tokenTest.payload.email;
            next();
            return;
        }
        throw new Error('instructor invalid token');
    }
    catch (error) {
        console.log('access token is invalid');
        res.locals[constant_1.LocalResponse.isAccessValid] = false;
        next();
    }
});
exports.checkAdminAccessToken = checkAdminAccessToken;
