"use strict";
import { join } from "node:path";
import Ad from "../../models/ad.js";
import config from "../../shared/config/index.js";
import { deleteFile } from "../../shared/utils/delete-file.js";
import { AppError } from "../../shared/error/app-error.js";

export class AdsController {
  static async getAds(req, res, next) {
    try {
      const { isActive } = req.query;
      const queryFilter = {};
      if (isActive) {
        queryFilter.active = isActive?.length === 4 ? true : false;
      }

      const ads = await Ad.find(queryFilter).select("-__v").lean();
      res.status(200).send(ads);
      return;
    } catch (err) {
      next(err);
    }
  }
  static async createAd(req, res, next) {
    try {
      const image = req.file.filename;
      const { name, link, location } = req.body;
      const newAd = await Ad.create({
        name,
        link,
        image,
        location,
      });
      const savedAd = await newAd.save();
      res.status(200).send({ message: "Uploaded successfully" });
      return;
    } catch (err) {
      next(err);
    }
  }

  static async editAd(req, res, next) {
    try {
      const { id } = req.params;
      const image = req?.file?.filename;

      const currentAd = await Ad.findOne({ _id: id });
      if (!currentAd) throw new AppError("No such advertisement found", 400);
      if (image && currentAd.image !== image) {
        const oldImagePath = join("/public", currentAd.image);
        await deleteFile(oldImagePath);
      }

      const { name, link, location } = req.body;

      const updatedAd = await Ad.findOneAndUpdate(
        { _id: req.params.id },
        { name, link, image: image || currentAd.image, location },
      );

      if (!updatedAd) throw new AppError("No such advertisement found", 400);

      await updatedAd.save();

      res.status(200).send({ message: "Updated successfully" });
      return;
    } catch (err) {
      next(err);
    }
  }

  static async setAdActive(req, res, next) {
    try {
      const { id, active } = req.query;

      const ad = await Ad.findOne({ _id: id });

      if (!ad) return res.status(404).send("No ad found");

      await Ad.updateMany(
        { $and: [{ location: ad.location }, { _id: { $ne: id } }] },
        { active: false },
      );

      ad.active = active;

      await ad.save();

      res.status(200).send({ message: "Updated successfully" });

      return;
    } catch (err) {
      next(err);
    }
  }

  static async deleteAdById(req, res, next) {
    try {
      const id = req.params.id;

      const ad = await Ad.findOne({ _id: id }).lean();
      if (!ad) return res.status(404).send("No such advertisement found");

      const pathToDelete = join(
        config.appRootPath,
        "public",
        "images",
        ad.image,
      );
      await deleteFile(pathToDelete);
      await Ad.findOneAndDelete({ _id: id });
      res.status(200).send({ message: "Deleted successfully" });
      return;
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async incrementAdViewsAndClicks(req, res, next) {
    try {
      const { id, prop, userId } = req.query;
      if (!id || !prop || !userId)
        return res
          .status(400)
          .send("Missing parameter: 'id' or 'prop' or 'userId'");

      if (prop !== "click" && prop != "view") {
        return res.status(400).send("prop must be click or view");
      }

      const ad = await Ad.findById(id);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const month = new Date(today.getFullYear(), today.getMonth(), 1);

      let todayDoc = ad.dailyClicksViews.find(
        (doc) => doc.date.toDateString() === today.toDateString(),
      );
      if (!todayDoc) {
        todayDoc = { date: today, clicks: [], views: [] };
        ad.dailyClicksViews.push(todayDoc);
      }

      let monthDoc = ad.monthlyClicksViews.find(
        (doc) => new Date(doc.date).setHours(0, 0, 0, 0) === month.getTime(),
      );
      if (!monthDoc) {
        monthDoc = { date: month, clicks: [], views: [] };
        ad.monthlyClicksViews.push(monthDoc);
      }

      if (prop === "click") {
        if (!todayDoc.clicks.includes(userId)) todayDoc.clicks.push(userId);
        if (!monthDoc.clicks.includes(userId)) monthDoc.clicks.push(userId);
      } else if (prop === "view") {
        if (!todayDoc.views.includes(userId)) todayDoc.views.push(userId);
        if (!monthDoc.views.includes(userId)) monthDoc.views.push(userId);
      }

      await ad.save();
      return res.status(200).send("Incremented...");
    } catch (err) {
      next(err);
    }
  }
}
