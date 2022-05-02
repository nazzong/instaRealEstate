const express = require("express");
const routes = require("../routes");
const MMController = require("../controller/MMController");

const MMRouter = express.Router();

MMRouter.post(routes.getProductDetail, MMController.getProductDetail);

module.exports = MMRouter;
