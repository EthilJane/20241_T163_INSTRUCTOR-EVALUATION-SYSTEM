"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.generateTokens = exports.decodeToken = exports.generateToken = void 0;
exports.verifySystemToken = verifySystemToken;
const verification_1 = require("./verification");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const constants_1 = require("./constants");
const jwt_decode_1 = require("jwt-decode");
const generateToken = (email, time, role) => {
    return jsonwebtoken_1.default.sign({ email: email, role: role }, constants_1.APP_TOKEN, { expiresIn: time });
};
exports.generateToken = generateToken;
const decodeToken = (token) => {
    return (0, jwt_decode_1.jwtDecode)(token);
};
exports.decodeToken = decodeToken;
const generateTokens = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let payload = (0, verification_1.verifyPayload)(yield (0, verification_1.verifyJWTGmail)(credentials));
        return (0, exports.generateToken)(payload.email, '15m');
    }
    catch (error) {
        console.log(error);
    }
});
exports.generateTokens = generateTokens;
function verifySystemToken(token) {
    try {
        let tokenPayload = jsonwebtoken_1.default.verify(token, constants_1.APP_TOKEN);
        console.log('payload', tokenPayload);
        return {
            valid: true,
            message: 'valid',
            payload: tokenPayload,
        };
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            console.error('Token is expired error');
            return { valid: false, message: 'expired' };
        }
        console.error('Token is invalid');
        return { valid: false, message: 'invalid' };
    }
}
