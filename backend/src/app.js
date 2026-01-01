import express from "express";

const app = express();

app.get("/test", (req, res) => {
  res.send("Welcome to test!");
});

export default app;
