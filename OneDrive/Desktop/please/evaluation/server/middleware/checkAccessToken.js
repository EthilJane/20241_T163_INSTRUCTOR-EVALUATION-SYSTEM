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
exports.validateAccessToken = void 0;
const systemToken_1 = require("../utils/systemToken");
const constants_1 = require("../utils/constants");
const constant_1 = require("./constant");
// export const checkAccessToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let accessToken = req.cookies[ACCESS_TOKEN_NAME];
//     console.log(accessToken);
//     if (!accessToken) return next();
//     let tokenTest = verifySystemToken(accessToken);
//     if (tokenTest.valid) {
//       console.log('access token is valid');
//       res
//         .status(200)
//         .send({ message: 'access token valid', role: tokenTest.payload?.role });
//       return;
//     }
//     throw new Error('invalid token');
//   } catch (error) {
//     console.log('access token is invalid');
//     res.locals.isAccessTokenValid = false;
//     next();
//   }
// };
const validateAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let accessToken = req.cookies[constants_1.ACCESS_TOKEN_NAME];
        if (!accessToken)
            return next();
        let tokenTest = (0, systemToken_1.verifySystemToken)(accessToken);
        if (tokenTest.valid && tokenTest.payload) {
            console.log('access token is valid');
            res.locals[constant_1.LocalResponse.isAccessValid] = true;
            res.locals[constant_1.LocalResponse.email] = tokenTest.payload.email;
            res.locals[constant_1.LocalResponse.role] = tokenTest.payload.role;
            next();
            return;
        }
        throw new Error('invalid token');
    }
    catch (error) {
        console.log('access token is invalid');
        res.locals[constant_1.LocalResponse.isAccessValid] = false;
        next();
    }
});
exports.validateAccessToken = validateAccessToken;
