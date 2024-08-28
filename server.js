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
app.use(express.static("./public"));
app.use(favicon("./public/favicon-icon.png"));

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
