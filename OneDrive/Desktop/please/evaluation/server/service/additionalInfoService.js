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
const AdditionalInfo_1 = require("../Model/AdditionalInfo");
exports.default = {
    getEmployeeAdditonalInfo(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let additional_info = yield AdditionalInfo_1.AdditionalInfo.findOne({
                    where: {
                        username: {
                            [sequelize_1.Op.eq]: email,
                        },
                    },
                    rejectOnEmpty: true,
                });
                return {
                    employee_id: additional_info.employee_id,
                    office_type: additional_info.office_type,
                    department: additional_info.department,
                    subject: additional_info.subject_code,
                    college: additional_info.college,
                    total_student: additional_info.total_student,
                };
            }
            catch (error) {
                console.log(error);
                return {};
            }
        });
    },
    updateAdditionalInfo(additionalInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield AdditionalInfo_1.AdditionalInfo.upsert({
                username: additionalInfo.username,
                employee_id: additionalInfo.employee_id,
                subject_code: additionalInfo.subject,
                college: additionalInfo.college,
                total_student: additionalInfo.total_student,
                office_type: additionalInfo.office_type,
            });
        });
    },
};
