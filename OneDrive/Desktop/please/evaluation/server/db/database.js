"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../Model/User");
const Token_1 = require("../Model/Token");
const AdditionalInfo_1 = require("../Model/AdditionalInfo");
const Admin_1 = require("../Model/Admin");
const Evaluation_1 = require("../Model/Evaluation");
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'sqlite', // Specify SQLite as the database
    storage: './database.sqlite', // Path to SQLite file (relative or absolute)
    models: [User_1.User, Token_1.Token, AdditionalInfo_1.AdditionalInfo, Admin_1.Admin, Evaluation_1.Evaluation], // Specify the path to your models
    logging: true, // Disable logging for cleaner output
    define: { timestamps: true },
});
exports.default = sequelize;
