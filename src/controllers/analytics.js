import testData from "../models/test-data.js";

export const getAnalyticsPage = (req, res, next) => {
    res.render("analytics", { ads: testData });
    return;
}
