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
exports.verifyCaptcha = exports.verifyPayload = void 0;
exports.verifyJWTGmail = verifyJWTGmail;
const index_1 = require("./constants/index");
const google_auth_library_1 = require("google-auth-library");
const date_1 = require("./date");
const axios_1 = __importDefault(require("axios"));
const client = new google_auth_library_1.OAuth2Client();
function verifyJWTGmail(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: index_1.CLIENT_ID,
        });
        return ticket.getPayload();
    });
}
const verifyPayload = (payload) => {
    if (!payload)
        throw 'no payload';
    if (!payload.email)
        throw 'no email';
    if (!payload.exp)
        throw '';
    if ((0, date_1.isTokenExpired)(payload.exp))
        throw 'expired';
    if (!payload.name)
        throw 'no name';
    return {
        email: payload.email,
        name: payload.name,
        picture: payload.picture || '',
    };
};
exports.verifyPayload = verifyPayload;
const verifyCaptcha = (captchaToken) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield axios_1.default.post('https://www.google.com/recaptcha/api/siteverify', undefined, {
        params: {
            secret: index_1.RECAPTCHA_ID,
            response: captchaToken,
        },
    });
    if (!res.data.success)
        throw new Error('invalid captcha');
    console.log('captcha success');
    return res;
});
exports.verifyCaptcha = verifyCaptcha;
