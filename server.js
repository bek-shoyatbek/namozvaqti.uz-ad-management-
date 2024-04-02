import express from "express"
import cors from "cors"
import expressSession from "express-session";
// import { fileURLToPath } from "url";
import http from "http";
import morgan from "morgan";

import { config } from "dotenv";


// import path from "path";

const app = express();

config();

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.use(cors({
  origin: '*'
}))
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 6 day
  },
  saveUninitialized: false
}));
app.use(morgan("dev"))

app.set("view engine", "ejs");
app.set("views", "src/views");




// Routes
import router from "./src/routes/index.js";
import connectDb from "./src/utils/db/connectDB.js";



app.use("/", router);



const port = process.env.PORT || 3333;


http.createServer(app).listen(port, () => {
  console.log(`Server is running on port ${port}`)
  connectDb();
});







