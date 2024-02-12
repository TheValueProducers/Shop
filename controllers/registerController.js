const {User} = require("../models/user")
const registerRender = (req,res) => {
    const user = req.user;
    res.render("register", {user})
}

const registerConfig = async (req,res) => {
    try{
        
        const newUser = new User({name: req.body.name, dateOfBirth: req.body.dateOfBirth, email: req.body.email, password: req.body.password, username: req.body.username});
        newUser.save();
        res.redirect("/api/v1/login")
    }catch(err){
        res.redirect("/api/v1/register")
    }

}

module.exports = {registerRender, registerConfig};