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
const authService_1 = require("../services/authService");
const authService = new authService_1.AuthService();
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entering user sign up in authcontroller');
            try {
                const { username, email, password } = req.body;
                console.log(username, 'name', email, 'email', 'password', password);
                const response = yield authService.registerUser(req.body);
                res.status(201).json(response);
            }
            catch (error) {
                console.log('error in the signup auth controller');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
    }
}
exports.default = AuthController;
