
const {Product} = require("../models/product");


const renderAdmin = async (req,res) => {
    const user = req.user;
    const items = await Product.fetchAll();
    
    res.render("adminAddItem", {lists: items, user })
}

const showAdminItems = async (req,res) => {
    const items = await Product.fetchAll();
    const user = req.user;
    
    res.render("adminProduct", {items, user})
    
}

const addItems = async (req,res) => {
    const user = req.user;
    const {name, price, description, imageLink} = req.body;
    const newProduct = new Product(null, name, price, description, imageLink);
    newProduct.save();
    res.redirect("/api/v1/admin")
    
    
}

const clearItem = async (req,res) => {
    
    const {index} = req.body;
    Product.delete(index)
    res.status(200).send("Message sent successfully");
}

const displayItemsInfo = async (req,res) => {
    const user = req.user;
    const {itemId} = req.params;
    const productToDisplay = await Product.fetchById(itemId);
    console.log(productToDisplay)

    res.render("adminEditItem", {productToDisplay, user})

}

const changeItems = async (req,res) => {
    const user = req.user;
    const {itemId} = req.params;
    const {name, price, description, imageLink} = req.body;
    const updatedProduct = new Product(itemId, name, price, description, imageLink);
    await updatedProduct.update();
    
    // const productList = await Product.fetchAll();
    // const existingIndex = productList.findIndex(product => product.id === itemId);
    // productList[existingIndex] = {id: productList[existingIndex].id, name, price, description, imageLink};
    // fsPromise.writeFile("./data/shop.json", JSON.stringify(productList, null, 2));
    res.status(200).json("Changes are successfully made")
    
}




module.exports = {renderAdmin, showAdminItems, addItems, clearItem, displayItemsInfo, changeItems}