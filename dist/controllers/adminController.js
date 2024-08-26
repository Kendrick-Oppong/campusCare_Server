"use strict";
// import { Request, Response } from "express";
// import { adminFormSchema } from "../validators/schema";
// import bcrypt from "bcrypt";
// import { prisma } from "../config/prisma";
// import { fromError } from "zod-validation-error";
// import { z } from "zod";
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
exports.adminLogin = adminLogin;
const schema_1 = require("../validators/schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../config/prisma");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
function adminLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Parse and validate the request body
            const { name, email, password } = schema_1.adminFormSchema.parse(req.body);
            // Check if an admin with the provided email exists in the database
            const existingAdmin = yield prisma_1.prisma.admin.findUnique({
                where: { email },
            });
            if (!existingAdmin) {
                return res.status(401).json({
                    message: "Invalid name, email, or password",
                });
            }
            // Check if the provided name matches the stored name
            if (existingAdmin.name !== name) {
                return res.status(401).json({
                    message: "Invalid name, email, or password",
                });
            }
            // Compare the provided password with the stored hashed password
            const isPasswordValid = yield bcrypt_1.default.compare(password, existingAdmin.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    message: "Invalid name, email, or password",
                });
            }
            // Return a success response if all credentials match
            return res.status(200).json({
                message: "Login successful",
                authenticated: true,
            });
        }
        catch (error) {
            const validationError = (0, zod_validation_error_1.fromError)(error);
            console.log(validationError.toString());
            console.error(error);
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ error: validationError.message });
            }
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
