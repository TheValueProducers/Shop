const express = require("express");
const {registerRender, registerConfig} = require("../controllers/registerController");
const {checkAuthenticated, checkNotAuthenticated} = require("../middleware/authentication")
const registerRouter = express.Router();


registerRouter.get("/register", checkNotAuthenticated, registerRender);
registerRouter.post("/register", checkNotAuthenticated, registerConfig);

module.exports = {registerRouter}