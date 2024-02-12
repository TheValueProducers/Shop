const {Cart} = require("../models/cart");

const renderCheckOut = async (req, res) => {
    try {
        const user = req.user;
        const items = await Cart.getProductDetails();

        const totalPrice = await Cart.getTotal();
        
        res.render("checkOut", { items, totalPrice, user });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error occurred while calculating the total price.");
    }
};

const changeQuantity = async (req, res) => {
    try {
        const user = req.user;
        const { itemId } = req.params;
        const { quantity } = req.body;
        await Cart.update(itemId, quantity);
        const items = await Cart.getProductDetails();

        const totalPrice = await Cart.getTotal();
        
        res.render("checkOut", { items, totalPrice, user });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "An error occurred while updating the elements" });
    }
};

const deleteCartItem = async (req,res) => {
    try{
        const user = req.user;
        const {index} = req.body;
        await Cart.delete(index)
        const items = await Cart.getProductDetails();
        const totalPrice = await Cart.getTotal();
        res.render("checkOut", { items, totalPrice, user })
        }catch(err){
            console.error("Error:", err)
            res.status(500).json({ error: "An error occurred while updating the elements" });
        }
}

module.exports = {renderCheckOut, changeQuantity, deleteCartItem}