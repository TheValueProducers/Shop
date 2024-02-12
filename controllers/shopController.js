const {Cart} = require("../models/cart")

const {Product} = require("../models/product");
const shopRender = async (req,res) => {
    const items = await Product.fetchAll();
    const user = req.user;
    
    res.render("shop", {items, user})
}

const addToCart = async (req,res) => {
    const {productId, quantity} = req.body;
    await Cart.save(productId, quantity);
    res.redirect("/api/v1/shop")
    
}

module.exports = {shopRender, addToCart}