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
exports.AuthService = void 0;
const userRespository_1 = require("../repositories/implementations/userRespository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthService {
    constructor() {
        this.userRespository = new userRespository_1.UserRepository();
    }
    registerUser(registerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = registerData;
            const exsistingUser = yield this.userRespository.findUserByEmail(email);
            if (exsistingUser)
                throw new Error('User already exists');
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = yield this.userRespository.createUser({
                username,
                email,
                password: hashedPassword
            });
            return newUser;
        });
    }
}
exports.AuthService = AuthService;
