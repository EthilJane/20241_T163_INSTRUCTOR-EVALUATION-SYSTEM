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
const express_1 = require("express");
const additionalInfoService_1 = __importDefault(require("../service/additionalInfoService"));
const constant_1 = require("../middleware/constant");
const validateUsertypeAccessToken_1 = require("../middleware/validateUsertypeAccessToken");
const instructorRouter = (0, express_1.Router)();
instructorRouter.get('/additional-info', validateUsertypeAccessToken_1.checkInstructorAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let isAccessValid = res.locals[constant_1.LocalResponse.isAccessValid];
        if (isAccessValid) {
            res.send(yield additionalInfoService_1.default.getEmployeeAdditonalInfo(res.locals[constant_1.LocalResponse.email]));
            return;
        }
        throw new Error('access is not valid');
    }
    catch (error) {
        res.status(401).send({ message: 'access is not valid' });
    }
}));
instructorRouter.post('/additional-info', validateUsertypeAccessToken_1.checkInstructorAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let isAccessValid = res.locals[constant_1.LocalResponse.isAccessValid];
        if (isAccessValid) {
            let addInfo = Object.assign(Object.assign({}, req.body), { username: res.locals[constant_1.LocalResponse.email] });
            yield additionalInfoService_1.default.updateAdditionalInfo(addInfo);
            res.status(200).send({ message: 'updated' });
            return;
        }
        throw new Error('access is not valid');
    }
    catch (error) {
        console.log(error);
        res.status(401).send({ message: 'error' });
    }
}));
exports.default = instructorRouter;
