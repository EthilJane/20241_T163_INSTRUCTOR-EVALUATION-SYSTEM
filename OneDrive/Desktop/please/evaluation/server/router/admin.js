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
exports.adminRouter = void 0;
const express_1 = require("express");
const validateUsertypeAccessToken_1 = require("../middleware/validateUsertypeAccessToken");
const constant_1 = require("../middleware/constant");
const evaluationService_1 = __importDefault(require("../service/evaluationService"));
const adminRouter = (0, express_1.Router)();
exports.adminRouter = adminRouter;
adminRouter.use(validateUsertypeAccessToken_1.checkAdminAccessToken);
adminRouter.post('/evaluation-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let evaluationDetails = req.body;
        let isAccessValid = res.locals[constant_1.LocalResponse.isAccessValid];
        if (isAccessValid) {
            console.log(evaluationDetails);
            yield evaluationService_1.default.addOrUpdateEvaluation(evaluationDetails);
            res.status(200).send({ message: 'success' });
            return;
        }
        throw new Error('access is not valid');
    }
    catch (error) {
        console.log(error);
        res.status(401).send({ message: 'access is not valid' });
    }
}));
adminRouter.get('/evaluation-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let evaluationDetails = req.body;
        let isAccessValid = res.locals[constant_1.LocalResponse.isAccessValid];
        if (isAccessValid) {
            console.log(evaluationDetails);
            res.status(200).send({
                message: 'success',
                data: yield evaluationService_1.default.getAllEvaluation(),
            });
            return;
        }
        throw new Error('access is not valid');
    }
    catch (error) {
        console.log(error);
        res.status(401).send({ message: 'access is not valid' });
    }
}));
adminRouter.post('/delete/evaluation-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let evaluationDetails = req.body;
        let isAccessValid = res.locals[constant_1.LocalResponse.isAccessValid];
        if (isAccessValid) {
            console.log(evaluationDetails);
            yield evaluationService_1.default.deleteEval(evaluationDetails);
            res.status(200).send({
                message: 'success',
            });
            return;
        }
        throw new Error('access is not valid');
    }
    catch (error) {
        console.log(error);
        res.status(401).send({ message: 'access is not valid' });
    }
}));
