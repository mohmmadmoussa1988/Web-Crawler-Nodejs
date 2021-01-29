var express = require("express");
var router = express.Router();
const { body } = require("express-validator/check");
const { validate } = require("../validate/index");
const searchController = require("../../controllers/searchController");
router.post("/", validate("SearchTerm"), searchController.search);
router.get(
  "/analyze",
  [validate("timestamp"), validate("count")],
  searchController.analyzeCreatedFiles
);

module.exports = router;
