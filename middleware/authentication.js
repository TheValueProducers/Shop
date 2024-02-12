function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect("/api/v1/login")
}

function checkNotAuthenticated(req,res,next){
    if (!req.isAuthenticated()){
        return next()
    }
    res.redirect("/api/v1/home")
}

module.exports = {checkAuthenticated, checkNotAuthenticated}