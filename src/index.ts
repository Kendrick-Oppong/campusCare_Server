import express, { Request, Response } from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import "dotenv/config";
import { router as userReport } from "./routes/userRoute";

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5432;

app.get("/", async (req: Request, res: Response) => {
  
  res.send("ok");
});

app.use("/api", userReport);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

