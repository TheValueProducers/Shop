const express = require('express');
const rootRouter = express.Router();
const {homeRouter} = require("./home");
const {adminRouter} = require("./admin");
const {shopRouter} = require("./shop")
const {checkOutRouter} = require("./checkOut");
const {registerRouter} = require("./register");
const {loginRouter} = require("./login")


rootRouter.use("/", homeRouter, adminRouter, shopRouter, checkOutRouter, registerRouter, loginRouter)

module.exports = {rootRouter}


