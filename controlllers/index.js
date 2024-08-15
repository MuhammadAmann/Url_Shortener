const urlModel = require("../models/index");
const shortid = require("shortid");

async function handleGenerateShortUrl(req, res) {
  const shortID = shortid(8);
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "Url required" });

  urlModel.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({ msg: "Short id  ", id: shortID });
}

async function handleGetRedirectUrl(req, res) {
  const shortId = req.params.shortId;
  const date = new Date();
  const visitingTime = `Date: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const entry = await urlModel.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: visitingTime,
        },
      },
    }
  );

  res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await urlModel.findOne({
    shortId,
  });

  return res.json({ msg: "Total Click: ", result: result.visitHistory.length });
}

module.exports = {
  handleGenerateShortUrl,
  handleGetRedirectUrl,
  handleGetAnalytics,
};
