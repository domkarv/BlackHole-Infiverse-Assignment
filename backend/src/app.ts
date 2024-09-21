import cors from "cors";
import express from "express";
import chatRouter from "./routes/chat.route";
import type { Response } from "express";

const app = express();

app.use(cors());
app.use(express.json()); // to parse json data
app.use(express.urlencoded({ extended: false })); // to parse form data

app.get("/", (_, res: Response) => {
  return res.json({
    msg: "BlackHole Infiverse Assingnment",
  });
});

app.use("/", chatRouter);

export default app;
