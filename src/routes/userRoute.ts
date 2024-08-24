import express, { Router } from "express";
import { getUserReport, userReport } from "../controllers/userController";

export const router: Router = express.Router();

router.get("/user/report", getUserReport);
router.post("/user/report", userReport);
