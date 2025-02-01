"use strict";
import express from "express";
import { getLogin, login } from "../controllers/login.js";
import { getHome } from "../controllers/home.js";
import { getAddPage } from "../controllers/add.js";
import { setActiveAd } from "../controllers/active-ad.js";
import { editAd, getEditPage } from "../controllers/edit.js";
import { deleteAd } from "../controllers/delete.js";
import { getAds } from "../controllers/getAds.js";
import { handleIncrement } from "../controllers/handle-increment.js";
import {
  getAnalytic,
  getAnalytics,
} from "../controllers/analytics.controller.js";
import upload from "../shared/utils/multer-init.js";
import { authenticateToken } from "../shared/middlewares/authorization.js";

const router = express.Router();

router.get("/", authenticateToken, getHome);

router.get("/login", getLogin);

router.post("/login", login);

router.get("/add", authenticateToken, getAddPage);

router.get("/analytics/:adId", getAnalytics);

router.get("/analytic/:adId", getAnalytic);

export default router;
