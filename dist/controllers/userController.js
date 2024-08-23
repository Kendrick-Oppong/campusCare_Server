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
exports.userReport = userReport;
exports.getUserReport = getUserReport;
const prisma_1 = require("../config/prisma");
const schema_1 = require("../validators/schema");
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
function userReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Parse and validate the request body using the UserReportSchema
            const { course, fullName, level, message, facility } = schema_1.UserReportSchema.parse(req.body);
            // Create a new report record in the database
            yield prisma_1.prisma.user.create({
                data: { course, fullName, level, facility, message },
            });
            res.status(201).json({ message: "Report successfully submitted" });
        }
        catch (error) {
            const validationError = (0, zod_validation_error_1.fromError)(error);
            console.log(validationError.toString());
            console.error(error);
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ error: validationError.message });
            }
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function getUserReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a new report record in the database
            const report = yield prisma_1.prisma.user.findMany({});
            if (!report) {
                res.status(400).json({ message: "No report found" });
            }
            res.status(200).json({ data: report });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
