import express from "express";
import expressSession from "express-session";
import morgan from "morgan";


import config from "../config/index.js";
import routes from "./routes/index.js";
import pageNotFound from "./utils/page-not-found.js";
import connectDb from "./utils/connectDb.js";
import { errorHandler } from "./utils/error/error-handler.js";


const app = express();



app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(morgan("dev"));


app.use(expressSession({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.set("views", "src/views");


app.get("/", (req, res) => {
    res.send("Hello World!");
});



app.use("/", routes);


app.use("*", pageNotFound);
app.use(errorHandler);









app.listen(config.port, async () => {
    console.log("Server started on port " + config.port);
    await connectDb();
});
