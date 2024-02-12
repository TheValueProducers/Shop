const express = require('express');
const {checkAuthenticated, checkNotAuthenticated} = require("../middleware/authentication")
const homeRouter = express.Router();
const {homeRender} = require("../controllers/homeController")

homeRouter.get("/home", checkAuthenticated, homeRender)

module.exports = {homeRouter}







