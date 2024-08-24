import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { userReportSchema } from "../validators/schema";
import { z } from "zod";
import { fromError } from "zod-validation-error";

export async function userReport(req: Request, res: Response) {
  try {
    // Parse and validate the request body using the UserReportSchema
    const { course, fullName, level, message, facility } =
      userReportSchema.parse(req.body);
    // Create a new report record in the database
    await prisma.user.create({
      data: { course, fullName, level, facility, message },
    });

    res.status(201).json({ message: "Report successfully submitted" });
  } catch (error) {
    const validationError = fromError(error);
    console.log(validationError.toString());
    console.error(error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: validationError.message });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getUserReport(req: Request, res: Response) {
  try {
    // Create a new report record in the database
    const report = await prisma.user.findMany({});

    if (!report) {
      res.status(400).json({ message: "No report found" });
    }
    res.status(200).json({ data: report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
