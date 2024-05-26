import Ad from "../models/ad.js";
import { join } from "node:path";
import { deleteFile } from "../utils/delete-file.js";
import config from "../config/index.js";

export const getAnalytics = async (req, res, next) => {
  try {
    res.render("analytics");
    return;
  } catch (err) {
    console.log(err);
    next(err);
  }
};
