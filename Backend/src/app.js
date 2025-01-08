import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import langflowRoutes from "./routes/LangFlow.route.js";

const app = express();
const _dirname = path.resolve();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api/v1/langflow", langflowRoutes); // Mount the Langflow routes

if (process.env.NODE_ENV === "production") {
  // Serve static frontend files
  app.use(express.static(path.resolve(_dirname, "frontend", "dist")));

  // Fallback for SPA routing
  app.get("*", (req, res, next) => {
    const filePath = path.resolve(_dirname, "frontend", "dist", "index.html");
    //console.log("rohan", filePath);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error loading the frontend.");
      }
    });
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully");
  });
}

// Export the app for deployment
export { app };
