const homeRender = (req,res) => {
    const user = req.user;
    res.render("home", {user})
}

module.exports = {homeRender}