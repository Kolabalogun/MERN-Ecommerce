import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import ProductRoutes from "./routes/product.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // Gets the current directory

app.use(express.json()); // Allows JSON

app.use("/api/products", ProductRoutes);

// Check if we are in production to serve static files
if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend/dist directory
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // Serve the index.html file for all routes that don't match API endpoints
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
