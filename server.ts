import app from "./src/app";
import { config } from "dotenv";
config()

// database connection import
import "./src/database/connection"
function startServer() {
   const port = process.env.PORT
  app.listen(port, function () {
    console.log(`Server started on port ${port}`);
  });
}

startServer();
