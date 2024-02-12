const express = require('express');
const {checkAuthenticated, checkNotAuthenticated} = require("../middleware/authentication")
const shopRouter = express.Router();


const {shopRender, addToCart} = require("../controllers/shopController")

shopRouter.get("/shop",checkAuthenticated,shopRender)

shopRouter.post("/shop/add-to-cart",checkAuthenticated, addToCart)


module.exports = { shopRouter }






