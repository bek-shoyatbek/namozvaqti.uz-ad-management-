import Ad from "../models/ad.js";

export const getAnalytics = async (req, res, next) => {
  const adId = req.params.adId;

  console.log(adId);

  try {
    const ad = await Ad.findById(adId);

    if (!ad) {
      return res.status(404).send("Ad not found");
    }
    res.render("analytics", { ad: JSON.stringify(ad) });
    return;
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getAnalytic = async (req, res, next) => {
  const adId = req.params.adId;

  try {
    const ad = await Ad.findById(adId);

    if (!ad) {
      return res.status(404).send("Ad not found");
    }
    console.log(ad);

    res.status(200).send({ ad });
    return;
  } catch (err) {
    console.log(err);
    next(err);
  }
};
