import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

dotenv.config({
  path: "./.env"
});

const app = express();

//Secure HTTP headers
app.use(helmet());

//CORS config
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
}

//basic config
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Routes
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import boardRouter from "./routes/board.route.js";
import listRouter from "./routes/list.route.js";
import taskrouter from "./routes/task.route.js";

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/boards", boardRouter, listRouter, taskrouter);

//Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong!",
    errors: err.errors || null,
    data: err.data || null,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

export default app;
