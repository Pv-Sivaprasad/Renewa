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
exports.UserRepository = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const userModel_2 = __importDefault(require("../../models/userModel"));
const baseRepository_1 = require("../baseRepository");
class UserRepository extends baseRepository_1.BaseRepository {
    constructor(userModel = userModel_1.default) {
        super(userModel);
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_2.default.create(user);
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_2.default.findOne({ email });
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_2.default.findById(id);
        });
    }
}
exports.UserRepository = UserRepository;
