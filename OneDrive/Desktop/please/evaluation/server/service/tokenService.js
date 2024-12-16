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
const sequelize_1 = require("sequelize");
const Token_1 = require("../Model/Token");
const systemToken_1 = require("../utils/systemToken");
exports.default = {
    isTokenValid(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findRefreshToken(email);
        });
    },
    findRefreshToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email)
                throw new Error('email is undefined');
            return yield Token_1.Token.findOne({
                where: {
                    [sequelize_1.Op.and]: {
                        username: {
                            [sequelize_1.Op.eq]: email,
                        },
                        revoked: false,
                        expiredDate: {
                            [sequelize_1.Op.lt]: new Date(),
                        },
                    },
                },
                order: [['expiredDate', 'DESC']],
                rejectOnEmpty: true,
            });
        });
    },
    createRefreshToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield Token_1.Token.update({ revoked: true }, { where: { revoked: false, username: email } });
            let refreshToken = (0, systemToken_1.generateToken)(email, '30d');
            let expDate = (_a = (0, systemToken_1.decodeToken)(refreshToken)) === null || _a === void 0 ? void 0 : _a.exp;
            if (!expDate)
                throw new Error('invalid expired date');
            yield Token_1.Token.create({
                username: email,
                RefreshToken: refreshToken,
                expiredDate: expDate,
            });
            return refreshToken;
        });
    },
    invalidateToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Token_1.Token.update({ revoked: true }, { where: { revoked: false, username: email } });
        });
    },
};
