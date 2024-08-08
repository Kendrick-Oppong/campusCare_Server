import express, { Router } from "express";
import { test } from "../controllers/userController";

export const router: Router = express.Router();

router.get("/user/report", test);
