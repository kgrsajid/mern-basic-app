import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./db/conn.js";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";

import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

// Security middleware
// app.use(helmet());
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://code.jquery.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "https://mern.kazi.rocks"]
    }
  }
}));

app.use(express.json()); // important

// Rate limiters
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 1000 request per windowMs
});

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10
});

const strictLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50
});

app.use(globalLimiter);

app.use("/products", strictLimiter, productRoutes);
app.use("/", userRoutes);


import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve React static files
app.use(express.static(path.join(__dirname, '../frontend-materialui/build')));

// Fallback for HTML5 history API - should be LAST
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend-materialui/build/index.html'));
});


// FOR JQUERY based FRONTEND
// app.use(express.static(path.join(__dirname, '../frontend')));

// // 404 handling middleware
// app.use((req, res) => {
//   res.status(404).sendFile(path.join(__dirname, '../frontend/404.html'));
// });

// // Fallback for HTML5 history API - should be LAST
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/404.html'));
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
    connectDB();
    console.log("Server started on port "+port);
});