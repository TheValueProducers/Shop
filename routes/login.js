const express = require("express");
const {checkAuthenticated, checkNotAuthenticated} = require("../middleware/authentication")
const { passport } = require("../config/passportConfig")
const { loginRender, logOut } = require("../controllers/loginController");
const loginRouter = express.Router();


loginRouter.get("/login",checkNotAuthenticated, loginRender);
loginRouter.post("/login",  passport.authenticate('local',{
    successRedirect: '/api/v1/home',
    failureRedirect: '/api/v1/login',
    failureFlash: false
}))

loginRouter.delete("/log-out", logOut)

module.exports = {loginRouter}