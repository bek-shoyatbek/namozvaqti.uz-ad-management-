import express from "express";
import cors from "cors";
import expressSession from "express-session";
import http from "http";
import morgan from "morgan";

import { config } from "dotenv";
import favicon from "serve-favicon";

const app = express();

config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(favicon("./public/favicon-icon.png"));
// Serve static files with caching and compression
app.use(
  "/images",
  express.static(path.join(__dirname, "public", "images"), {
    maxAge: "1d", // Cache images for 1 day
    immutable: true, // Indicates that the file will not change over time
    etag: true, // Enable ETag for caching
    lastModified: true, // Enable Last-Modified header
    setHeaders: (res, path, stat) => {
      res.set("Cache-Control", "public, max-age=86400, immutable");
      // Enable CORS if needed
      res.set("Access-Control-Allow-Origin", "*");
      // Set content type based on file extension
      if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
        res.set("Content-Type", "image/jpeg");
      } else if (path.endsWith(".png")) {
        res.set("Content-Type", "image/png");
      } else if (path.endsWith(".webp")) {
        res.set("Content-Type", "image/webp");
      }
    },
  })
);

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 6 day
    },
    saveUninitialized: false,
  })
);
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", "src/views");

// Routes
import router from "./src/routes/index.js";
import connectDb from "./src/utils/db/connectDB.js";

app.use("/", router);

const port = process.env.PORT || 3333;

http.createServer(app).listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectDb();
});
