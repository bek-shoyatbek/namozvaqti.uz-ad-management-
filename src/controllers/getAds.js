import Ad from "../models/ad.js";
import cache from "../utils/node-cache/index.js"


export const getAds = async (req, res, next) => {
    try {

        // const cachedAds = cache.get("ads");
        // if (cachedAds) {
        //     console.log("Using cached ads", cachedAds);
        //     return res.status(200).send(cachedAds);
        // }
        // If there are no ads in the cache, get them from the database
        const ads = await Ad.find({ active: true }).select("-__v").lean();


        // cache.set("ads", ads, 60 * 2); // Cache ads for 2 minutes

        res.status(200).send(ads);
        return;
    } catch (err) {
        next(err);
    }
}

