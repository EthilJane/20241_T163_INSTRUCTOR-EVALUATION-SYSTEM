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
const Evaluation_1 = require("../Model/Evaluation");
const uuid_1 = require("uuid");
exports.default = {
    addOrUpdateEvaluation(EvalDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!EvalDetails.evaluation_id) {
                return yield Evaluation_1.Evaluation.create({
                    semester: EvalDetails.semester,
                    college: EvalDetails.college,
                    deadline: EvalDetails.deadline,
                    evaluation_title: EvalDetails.evaluation,
                    link_id: (0, uuid_1.v4)(),
                });
            }
            return yield Evaluation_1.Evaluation.update({
                semester: EvalDetails.semester,
                college: EvalDetails.college,
                deadline: EvalDetails.deadline,
                evaluation_title: EvalDetails.evaluation,
            }, {
                where: {
                    id: EvalDetails.evaluation_id,
                },
            });
        });
    },
    getAllEvaluation() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Evaluation_1.Evaluation.findAll({
                order: [['deadline', 'desc']],
                attributes: [
                    ['id', 'evaluation_id'],
                    ['evaluation_title', 'evaluation'],
                    'deadline',
                    'semester',
                    'college',
                    'link_id',
                ],
            });
        });
    },
    deleteEval(EvalDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Evaluation_1.Evaluation.destroy({
                where: { id: EvalDetails.evaluation_id },
            });
        });
    },
};
