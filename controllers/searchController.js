const cheerio = require("cheerio");
const { checkReqValidation } = require("../services/validate");
const { search } = require("../services/api");
const {
  loopURLS,
  readAndAnalyzeFolder,
  downloadWebPage,
} = require("../services/services");
const {
  SEARCH_ENGINE_URL,
  KEY,
  CX,
  DOWNLOAD_FOLDER,
} = require("../constants/index");
const fs = require("fs");
exports.search = async (req, res, next) => {
  const errors = checkReqValidation(req);
  if (errors.error) {
    res.status(422).json(errors.error);
    return;
  }
  try {
    const urlsList = await search(req.body.SearchTerm);
    const result = await downloadWebPage(urlsList.data.items);
    res.status(200).json({ timestamp: result });
  } catch (err) {
    res.status(400).json({ error: err.toString() });
  }
};

exports.analyzeCreatedFiles = async (req, res, next) => {
  const errors = checkReqValidation(req);
  if (errors.error) {
    res.status(422).json(errors.error);
    return;
  }
  const timestamp = req.query.timestamp;
  const count = req.query.count;
  const analyzeFolder = await readAndAnalyzeFolder(timestamp, count);
  res.status(200).json({ values: analyzeFolder });
};
