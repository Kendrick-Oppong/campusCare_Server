"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
exports.router = express_1.default.Router();
exports.router.post("/admin/login", adminController_1.adminLogin);
// router.post("/admin/report", userReport);
