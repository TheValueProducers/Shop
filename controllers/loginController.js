const loginRender = (req,res) => {
    const user = req.user;
    res.render("login", {user})
}

const logOut = (req,res,next) => {
    req.logout(function(err){
        if (err){ next(err)}
    })
    res.redirect("/api/v1/login")
}

module.exports = {loginRender, logOut};