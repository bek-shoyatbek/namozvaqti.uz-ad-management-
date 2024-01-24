import express from "express";


import { getLogin, login } from "../controllers/login.js";
import { getHome } from "../controllers/home.js";
import authorizeUser from "../middlewares/authorization.js";
import { add, getAddPage } from "../controllers/add.js";
import { getAnalyticsPage } from "../controllers/analytics.js";
import upload from "../utils/multer/index.js";

const router = express.Router();


// Authorization
router.get("/login", getLogin);

router.post("/login", login);

// Home
router.get("/home", authorizeUser, getHome);


// Add 
router.get("/add", authorizeUser, getAddPage);

router.post("/add", authorizeUser, upload.single("image"), add);

// Analytics

router.get("/analytics", authorizeUser, getAnalyticsPage);


export default router