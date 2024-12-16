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
exports.logoutUser = exports.getUserRole = exports.getUserInfo = void 0;
const constant_1 = require("../middleware/constant");
const userService_1 = __importDefault(require("../service/userService"));
const tokenService_1 = __importDefault(require("../service/tokenService"));
const constants_1 = require("../utils/constants");
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let isAccessValid = res.locals[constant_1.LocalResponse.isAccessValid];
        if (isAccessValid) {
            res.send(yield userService_1.default.getUserInfo(res.locals[constant_1.LocalResponse.email]));
            return;
        }
        throw new Error('access is not valid');
    }
    catch (error) {
        res.status(401).send({ message: 'access is not valid' });
    }
});
exports.getUserInfo = getUserInfo;
const getUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let isAccessValid = res.locals[constant_1.LocalResponse.isAccessValid];
        if (isAccessValid) {
            res
                .status(200)
                .send({ message: 'role', role: res.locals[constant_1.LocalResponse.role] });
            return;
        }
        throw new Error('access is not valid');
    }
    catch (error) {
        res.status(401).send({ message: 'access is not valid' });
    }
});
exports.getUserRole = getUserRole;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let isAccessValid = res.locals[constant_1.LocalResponse.isAccessValid];
        if (isAccessValid) {
            yield tokenService_1.default.invalidateToken(res.locals[constant_1.LocalResponse.email]);
            res
                .clearCookie(constants_1.ACCESS_TOKEN_NAME)
                .status(200)
                .send({ message: 'role', role: res.locals[constant_1.LocalResponse.role] });
            return;
        }
    }
    catch (error) {
        res.status(401).send({ message: 'couldnt logout user' });
    }
});
exports.logoutUser = logoutUser;
