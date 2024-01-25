import express from "express";


import { getLogin, login } from "../controllers/login.js";
import { getHome } from "../controllers/home.js";
import authorizeUser from "../middlewares/authorization.js";
import { add, getAddPage } from "../controllers/add.js";
import { getAnalyticsPage } from "../controllers/analytics.js";
import upload from "../utils/multer/index.js";
import { setActiveAd } from "../controllers/active-ad.js";
import { editAd, getEditPage } from "../controllers/edit.js";
import { deleteAd } from "../controllers/delete.js";
import { getAds } from "../controllers/getAds.js";

const router = express.Router();


// Authorization
router.get("/login", getLogin);

router.post("/login", login);

// Home
router.get("/home", authorizeUser, getHome);


// Add 
router.get("/add", authorizeUser, getAddPage);


router.get("/get-ads", getAds);

router.post("/add", authorizeUser, upload.single("image"), add);

// Edit 

router.put("/active", authorizeUser, setActiveAd);

router.post("/update/:id", authorizeUser, upload.single("image"), editAd);

router.get("/edit/:id", authorizeUser, getEditPage);

router.delete("/delete", authorizeUser, deleteAd);



// Analytics

router.get("/analytics", authorizeUser, getAnalyticsPage);


export default router