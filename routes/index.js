const express = require("express");
const {
  handleGenerateShortUrl,
  handleGetRedirectUrl,
  handleGetAnalytics,
} = require("../controlllers/index.js");
const router = express.Router();

router.post("/", handleGenerateShortUrl);

router.get("/:shortId", handleGetRedirectUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
