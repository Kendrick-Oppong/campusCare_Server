"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReportSchema = void 0;
const zod_1 = require("zod");
exports.UserReportSchema = zod_1.z.object({
    fullName: zod_1.z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .regex(/^[a-zA-Z\s]+$/, {
        message: "Name can only contain letters ",
    }),
    course: zod_1.z
        .string()
        .min(3, { message: "Course must be at least 3 characters long" })
        .regex(/^[a-zA-Z\s]+$/, {
        message: "Course can only contain letters ",
    }),
    level: zod_1.z
        .enum(["100", "200", "300", "400", "500", "600", "700"], {
        errorMap: () => ({
            message: "Level must be one of '100', '200', '300', '400', '500', '600', or '700'",
        }),
    })
        .transform((val) => Number(val)),
    facility: zod_1.z.string().min(3, { message: "Please select a facility" }),
    message: zod_1.z
        .string()
        .min(5, { message: "Your message must be at least 5 characters long" })
        .max(600, { message: "Message cannot exceed 600 characters" }),
});
