// import { Request, Response } from "express";
// import { adminFormSchema } from "../validators/schema";
// import bcrypt from "bcrypt";
// import { prisma } from "../config/prisma";
// import { fromError } from "zod-validation-error";
// import { z } from "zod";

// const saltRounds = 10;

// export async function adminLogin(req: Request, res: Response) {
//   try {
//     // Parse and validate the request body
//     const { name, email, password } = adminFormSchema.parse(req.body);

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Store the admin in the database
//     const newAdmin = await prisma.admin.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     // Return a success response
//     return res.status(201).json({
//       message: "Login successful",
//       isAuthenticated: true,
//     });
//   } catch (error) {
//     const validationError = fromError(error);
//     console.log(validationError.toString());
//     console.error(error);

//     if (error instanceof z.ZodError) {
//       return res.status(400).json({ error: validationError.message });
//     }

//     if (error instanceof Error) {
//       return res.status(400).json({
//         message: error.message,
//       });
//     }

//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

import { Request, Response } from "express";
import { adminFormSchema } from "../validators/schema";
import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import { fromError } from "zod-validation-error";
import { z } from "zod";

export async function adminLogin(req: Request, res: Response) {
  try {
    // Parse and validate the request body
    const { name, email, password } = adminFormSchema.parse(req.body);

    // Check if an admin with the provided email exists in the database
    const existingAdmin = await prisma.admin.findUnique({
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
    const isPasswordValid = await bcrypt.compare(
      password,
      existingAdmin.password
    );

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
  } catch (error) {
    const validationError = fromError(error);
    console.log(validationError.toString());
    console.error(error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: validationError.message });
    }

    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
}
