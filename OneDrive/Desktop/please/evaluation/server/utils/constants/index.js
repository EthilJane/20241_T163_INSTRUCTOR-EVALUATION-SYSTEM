"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_CREDENTIALS = exports.RECAPTCHA_ID = exports.STUDENT_EMAIL_STRUCTURE = exports.DEFAULT_PASSWORD = exports.ACCESS_TOKEN_NAME = exports.APP_TOKEN = exports.CLIENT_ID = exports.jwtSecret = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.jwtSecret = process.env.JWT_SECRET || '';
exports.CLIENT_ID = process.env.CLIENT_ID;
exports.APP_TOKEN = process.env.TOKEN_SECRET || '';
exports.ACCESS_TOKEN_NAME = 'accessToken';
exports.DEFAULT_PASSWORD = process.env.DEFAULT_PASS || '';
exports.STUDENT_EMAIL_STRUCTURE = 'student.buksu.edu';
exports.RECAPTCHA_ID = process.env.RECAPTCHA_ID || '';
exports.ADMIN_CREDENTIALS = {
    username: process.env.DEFAULT_ADMIN_USERNAME || '',
    password: process.env.DEFAULT_ADMIN_PASS || '',
};
