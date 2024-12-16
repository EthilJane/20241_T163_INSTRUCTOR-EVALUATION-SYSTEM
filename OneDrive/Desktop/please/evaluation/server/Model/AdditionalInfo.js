"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalInfo = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
let AdditionalInfo = class AdditionalInfo extends sequelize_typescript_1.Model {
};
exports.AdditionalInfo = AdditionalInfo;
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Object)
], AdditionalInfo.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    __metadata("design:type", String)
], AdditionalInfo.prototype, "username", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Object)
], AdditionalInfo.prototype, "employee_id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", Object)
], AdditionalInfo.prototype, "office_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)('Department of technology'),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", Object)
], AdditionalInfo.prototype, "department", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], AdditionalInfo.prototype, "subject_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)('College of technology'),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], AdditionalInfo.prototype, "college", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.NUMBER),
    __metadata("design:type", Number)
], AdditionalInfo.prototype, "total_student", void 0);
exports.AdditionalInfo = AdditionalInfo = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true })
], AdditionalInfo);
