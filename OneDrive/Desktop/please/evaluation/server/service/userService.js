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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../Model/User");
const verification_1 = require("../utils/verification");
const sequelize_1 = require("sequelize");
const constants_1 = require("../utils/constants");
exports.default = {
    saltRound: 10,
    _verifyPassword(plainPassword, hashPass) {
        return bcrypt_1.default.compareSync(plainPassword, hashPass);
    },
    _hashPassword(plainPassword, defaultPass = constants_1.DEFAULT_PASSWORD) {
        return bcrypt_1.default.hashSync(plainPassword ? plainPassword : defaultPass, this.saltRound);
    },
    _identifyRole(email) {
        return email.endsWith('@student.buksu.edu.ph') ? 'student' : 'instructor';
    },
    // this will throw an error if the gmail token is not valid
    processGmailLogin(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            //this will throw an error if the details are incoreect
            let payload = (0, verification_1.verifyPayload)(yield (0, verification_1.verifyJWTGmail)(credentials));
            return yield User_1.User.findOrCreate({
                where: {
                    username: {
                        [sequelize_1.Op.eq]: payload.email,
                    },
                },
                defaults: {
                    username: payload.email,
                    picture: payload.picture,
                    name: payload.name,
                },
            });
        });
    },
    processEmailLogin(loginDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.User.findOne({
                where: {
                    username: {
                        [sequelize_1.Op.eq]: loginDetails.email,
                    },
                },
                attributes: ['passwordHash', 'role', 'username'],
            });
            if (!user)
                throw new Error('Please register first by login in your university account');
            if (!this._verifyPassword(loginDetails.password, user.passwordHash))
                throw new Error('Invalid password');
            return user;
        });
    },
    getUserInfo(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.User.findOne({
                where: {
                    username: {
                        [sequelize_1.Op.eq]: email,
                    },
                },
            });
            return { email: user === null || user === void 0 ? void 0 : user.username, name: user === null || user === void 0 ? void 0 : user.name, picture: user === null || user === void 0 ? void 0 : user.picture };
        });
    },
};
