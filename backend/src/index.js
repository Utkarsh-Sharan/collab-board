import dotenv from "dotenv";
import app from "./app.js";
import path from "path";

dotenv.config({
  path: path.resolve("src/.env"),
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
