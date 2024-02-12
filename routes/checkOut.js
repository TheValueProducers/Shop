const express = require('express');
const {checkAuthenticated, checkNotAuthenticated} = require("../middleware/authentication")
const checkOutRouter = express.Router();

const {renderCheckOut, changeQuantity, deleteCartItem} = require("../controllers/checkOutController")

checkOutRouter.get("/check-out",checkAuthenticated, renderCheckOut);

checkOutRouter.put("/check-out/change-product/:itemId",checkAuthenticated, changeQuantity)
checkOutRouter.delete("/check-out/change-product",checkAuthenticated, deleteCartItem)

module.exports = {checkOutRouter}