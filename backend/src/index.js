import dotenv from "dotenv";
import app from "./app.js";
import path from "path";
import connectDB from "./db/index.js";

dotenv.config({
  path: path.resolve("src/.env"),
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect with MongoDB!", err);
    process.exit(1);
  });
