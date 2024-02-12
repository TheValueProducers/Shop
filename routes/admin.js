const express = require('express');
const {checkAuthenticated, checkNotAuthenticated} = require("../middleware/authentication")


const adminRouter = express.Router();
const {renderAdmin, showAdminItems, addItems, clearItem, displayItemsInfo, changeItems} = require("../controllers/adminController");




adminRouter.use(express.urlencoded({extended: false}));

adminRouter.get("/admin",checkAuthenticated,renderAdmin);

adminRouter.post("/admin", checkAuthenticated,addItems);

adminRouter.get("/admin-product", checkAuthenticated,showAdminItems);
;
adminRouter.get("/admin-edit-items/:itemId", checkAuthenticated,displayItemsInfo);

adminRouter.put("/admin-edit-items/:itemId", checkAuthenticated,changeItems);


adminRouter.delete("/admin-clear", checkAuthenticated, clearItem);






module.exports = {adminRouter}









