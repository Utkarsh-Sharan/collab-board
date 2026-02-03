import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env"
});

const PORT = process.env.PORT;

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
