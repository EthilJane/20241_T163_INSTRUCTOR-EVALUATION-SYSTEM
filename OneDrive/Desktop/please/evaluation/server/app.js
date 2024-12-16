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
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./router/login"));
const auth_1 = __importDefault(require("./router/auth"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = __importDefault(require("./db/database"));
const token_1 = __importDefault(require("./router/token"));
const instructor_1 = __importDefault(require("./router/instructor"));
const user_1 = require("./router/user");
const Admin_1 = require("./Model/Admin");
const constants_1 = require("./utils/constants");
const admin_1 = require("./router/admin");
const path_1 = __importDefault(require("path"));
database_1.default.sync().then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('connected to the database');
    Admin_1.Admin.findOrCreate({
        where: { username: constants_1.ADMIN_CREDENTIALS.username },
        defaults: {
            username: constants_1.ADMIN_CREDENTIALS.username,
            passwordHash: constants_1.ADMIN_CREDENTIALS.password,
        },
    });
}));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)({ origin: 'http://localhost:8081', credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../dist')));
app.use('/admin', express_1.default.static(path_1.default.join(__dirname, '../dist/admin.html')));
app.use('/login', login_1.default);
app.use('/authetication', auth_1.default);
app.use('/token', token_1.default);
app.use('/instructor', instructor_1.default);
app.use('/user', user_1.userRouter);
app.use('/admin', admin_1.adminRouter);
// app.use('/user', userRouter);
app.get('/', (req, res) => {
    res.send('im good');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
