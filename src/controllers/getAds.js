import Ad from "../models/ad.js";

export const getAds = async (req, res, next) => {
  try {
    // If there are no ads in the cache, get them from the database
    const ads = await Ad.find({ active: true }).select("-__v").lean();

    res.status(200).send(ads);
    return;
  } catch (err) {
    next(err);
  }
};
