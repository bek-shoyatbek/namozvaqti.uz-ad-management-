"use strict";
import express from "express";
import { authenticateToken } from "../../shared/middlewares/authorization.js";
import upload from "../../shared/utils/multer-init.js";
import { AdsController } from "./ads.controller.js";

export const adsRouter = express.Router();

adsRouter.get("/", authenticateToken, AdsController.getAds);

adsRouter.post(
  "/",
  authenticateToken,
  upload.single("image"),
  AdsController.createAd,
);

adsRouter.put("/active", authenticateToken, AdsController.setAdActive);

adsRouter.put("/increment", AdsController.incrementAdViewsAndClicks);
adsRouter.put(
  "/:id",
  authenticateToken,
  upload.single("image"),
  AdsController.editAd,
);

adsRouter.delete("/:id", authenticateToken, AdsController.deleteAdById);
