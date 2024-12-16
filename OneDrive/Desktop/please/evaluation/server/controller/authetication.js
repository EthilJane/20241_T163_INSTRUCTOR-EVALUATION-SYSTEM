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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.loginWithEmail = exports.verifyAuthentication = exports.loginGmail = void 0;
const systemToken_1 = require("../utils/systemToken");
const userService_1 = __importDefault(require("../service/userService"));
const tokenService_1 = __importDefault(require("../service/tokenService"));
const constants_1 = require("../utils/constants");
const sequelize_1 = require("sequelize");
const tokenController_1 = require("./tokenController");
const adminService_1 = __importDefault(require("../service/adminService"));
const verification_1 = require("../utils/verification");
const ErrorHandler = (error, res) => {
    console.log(error);
    if (error instanceof sequelize_1.ValidationError) {
        console.log('sequelize error');
        res.status(401).send({ message: error.message });
        return;
    }
    if (error instanceof Error) {
        res.status(401).send({ message: error.message });
        return;
    }
    res.status(401).send({ message: error });
};
const loginGmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cred = req.body.credentials;
        console.log('gmail', cred);
        console.log('continue...');
        let [user, created] = yield userService_1.default.processGmailLogin(cred);
        yield tokenService_1.default.createRefreshToken(user.username);
        let accessToken = (0, systemToken_1.generateToken)(user.username, '15m', user.role);
        (0, tokenController_1.createAccessCookie)(res, accessToken);
        res.status(200).send({ message: 'access token received', role: user.role });
    }
    catch (error) {
        ErrorHandler(error, res);
    }
});
exports.loginGmail = loginGmail;
const verifyAuthentication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let accessToken = req.cookies[constants_1.ACCESS_TOKEN_NAME];
        console.log(accessToken);
        if (!accessToken)
            throw new Error('empty token');
        let tokenTest = (0, systemToken_1.verifySystemToken)(accessToken);
        yield tokenService_1.default.findRefreshToken((_a = tokenTest.payload) === null || _a === void 0 ? void 0 : _a.email);
        if (tokenTest.valid) {
            console.log('access token is valid');
            res
                .status(200)
                .send({ message: 'access token valid', role: (_b = tokenTest.payload) === null || _b === void 0 ? void 0 : _b.role });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).send({ message: 'unauthorized' });
    }
});
exports.verifyAuthentication = verifyAuthentication;
const loginWithEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let loginDetails = req.body;
        console.log('email_login', loginDetails);
        let user = yield userService_1.default.processEmailLogin(loginDetails);
        yield tokenService_1.default.createRefreshToken(loginDetails.email);
        let accessToken = (0, systemToken_1.generateToken)(loginDetails.email, '15m', user.role);
        (0, tokenController_1.createAccessCookie)(res, accessToken);
        res.status(200).send({ message: 'access token received', role: user.role });
    }
    catch (error) {
        ErrorHandler(error, res);
    }
});
exports.loginWithEmail = loginWithEmail;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let loginDetails = req.body;
        yield (0, verification_1.verifyCaptcha)(loginDetails.captcha);
        let admin = yield adminService_1.default.processLogin(loginDetails);
        yield tokenService_1.default.createRefreshToken(admin.username);
        let accessToken = (0, systemToken_1.generateToken)(admin.username, '15m', 'admin');
        (0, tokenController_1.createAccessCookie)(res, accessToken);
        res.status(200).send({ message: 'access token received', role: 'admin' });
    }
    catch (error) {
        ErrorHandler(error, res);
    }
});
exports.loginAdmin = loginAdmin;
