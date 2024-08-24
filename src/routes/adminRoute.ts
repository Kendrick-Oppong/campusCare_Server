import express, { Router } from "express";
import { adminLogin } from "../controllers/adminController";

export const router: Router = express.Router();

router.post("/admin/login", adminLogin);
// router.post("/admin/report", userReport);
