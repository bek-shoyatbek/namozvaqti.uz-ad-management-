import express from "express";


import { getLogin, login } from "../controllers/login.js";
import { getHome } from "../controllers/home.js";
import { add, getAddPage } from "../controllers/add.js";
import upload from "../utils/multer/index.js";
import { setActiveAd } from "../controllers/active-ad.js";
import { editAd, getEditPage } from "../controllers/edit.js";
import { deleteAd } from "../controllers/delete.js";
import { getAds } from "../controllers/getAds.js";
import { handleIncrement } from "../controllers/handle-increment.js";
import authenticateToken from "../middlewares/authorization.js";

const router = express.Router();

router.get("/", authenticateToken, getHome);

// Authorization
router.get("/login", getLogin);

router.post("/login", login);

// Home


// Add 
router.get("/add", authenticateToken, getAddPage);

router.get("/get-ads", getAds);

router.post("/add", authenticateToken, upload.single("image"), add);

// Edit 

router.put("/active", authenticateToken, setActiveAd);

router.post("/update/:id", authenticateToken, upload.single("image"), editAd);

router.get("/edit/:id", authenticateToken, getEditPage);

router.delete("/delete", authenticateToken, deleteAd);


// Handle views and clicks

router.get("/handle-increment", handleIncrement);


export default router