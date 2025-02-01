import express from "express";
import cors from "cors";
import expressSession from "express-session";
import http from "http";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import favicon from "serve-favicon";

import router from "./routes/index.js";
import { adsRouter } from "./modules/ads/ads.routes.js";
import connectDb from "./shared/utils/connectDB.js";
import config from "./shared/config/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(favicon("./public/favicon-icon.png"));
app.use("/images", express.static(path.join(__dirname, "public", "images")));

app.use(
  cors({
    origin: "*",
  }),
);

app.use(
  expressSession({
    secret: config.sessionSecret,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    saveUninitialized: false,
  }),
);
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", "src/views");

// app.use("/", router);
app.use("/ads", adsRouter);

const port = config.port || 3333;

http.createServer(app).listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectDb();
});
