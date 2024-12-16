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
exports.refreshToken = exports.createAccessCookie = void 0;
const tokenService_1 = __importDefault(require("../service/tokenService"));
const constants_1 = require("../utils/constants");
const systemToken_1 = require("../utils/systemToken");
const createAccessCookie = (res, accessToken) => {
    res.cookie(constants_1.ACCESS_TOKEN_NAME, accessToken, {
        httpOnly: true, // Ensures the cookie is not accessible via JavaScript
        // secure: true,   // Ensures the cookie is only sent over HTTPS (recommended for production)
        // sameSite: 'strict', // Mitigates CSRF attacks
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
};
exports.createAccessCookie = createAccessCookie;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('calling refresh');
        let accessToken = req.cookies[constants_1.ACCESS_TOKEN_NAME];
        let verification = (0, systemToken_1.verifySystemToken)(accessToken);
        let tokenDecode = (0, systemToken_1.decodeToken)(accessToken);
        if (verification.message == 'expired') {
            console.log('token is expired in refresh');
            if (!tokenDecode.email)
                throw new Error('no email');
            yield tokenService_1.default.findRefreshToken(tokenDecode.email);
            (0, exports.createAccessCookie)(res, (0, systemToken_1.generateToken)(tokenDecode.email, '15m', tokenDecode.role));
            console.log('refreshing the token');
            res.status(200).send({ message: 'access token refreshed' });
            return;
        }
        else if (verification.message == 'valid') {
            res.status(200).send({ message: 'access token is still valid' });
            return;
        }
        console.log(verification);
        throw new Error('invalid token');
    }
    catch (error) {
        console.log(error);
        res.status(401).send({ message: 'token validation error' });
    }
});
exports.refreshToken = refreshToken;
