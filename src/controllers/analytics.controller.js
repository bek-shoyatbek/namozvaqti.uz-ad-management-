import Ad from "../models/ad.js";
import { join } from "node:path";
import { deleteFile } from "../utils/delete-file.js";
import config from "../config/index.js";

export const getAnalytics = async (req, res, next) => {
  const adId = req.params.adId;

  console.log(adId);

  try {
    const ad = await Ad.findById(adId);

    if (!ad) {
      return res.status(404).send("Ad not found");
    }
    console.log(ad);

    res.render("analytics", { ad: ad.toJSON() });
    return;
  } catch (err) {
    console.log(err);
    next(err);
  }
};
