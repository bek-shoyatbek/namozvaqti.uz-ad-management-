import { AppError } from "../shared/error/app-error.js";
import Ad from "../models/ad.js";

export const handleIncrement = async (req, res, next) => {
  try {
    const { id, prop, userId } = req.query;
    if (!id || !prop || !userId)
      throw new AppError("Missing parameter: 'id' or 'prop' or 'userId'");

    const ad = await Ad.findById(id);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

    const month = new Date(today.getFullYear(), today.getMonth(), 1); // Get the first day of the current month

    // Find or create today's clicks/views document
    let todayDoc = ad.dailyClicksViews.find(
      (doc) => doc.date.toDateString() === today.toDateString()
    );
    if (!todayDoc) {
      todayDoc = { date: today, clicks: [], views: [] };
      ad.dailyClicksViews.push(todayDoc);
    }

    // Find or create this month's clicks/views document
    let monthDoc = ad.monthlyClicksViews.find(
      (doc) => new Date(doc.date).setHours(0, 0, 0, 0) === month.getTime()
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
};
