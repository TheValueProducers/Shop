require("dotenv").config()
const express = require('express');
const rootDir = require("./path/path").pathName();
const path = require('path');
const {passport} = require("./config/passportConfig");
const session = require("express-session");
const {rootRouter} = require('./routes/root');
const app = express();
const port = 3000;
const {notFound} = require("./controllers/404NotFound")


app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session())

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use("/api/v1", rootRouter);

app.use(notFound)







app.listen(port, (req,res) => {
    console.log(`Server is listening to port ${port}`);
})

