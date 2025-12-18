//passpoet wala code we will write below the season because once my season is got
//ativated and user login then i dont want to login user again because it is a same season 
//my season will track the season 
const express = require("express");
// const path = require("path")
const ejs_mate = require('ejs-mate')
const mongoose = require("mongoose");
const app = express();
const users = require('./routes/user')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const cookieParser = require('cookie-parser')

const sessionOptions = {
    secret: "Mysupersecretstring",
    resave:false, //dont force to save that in the main database
    saveUninitialized:true //save the uninitialized data also
    // cookie: {
    //     expires: Date.now() + 10000,
    // }
};

app.use(cookieParser("LuckyGehlot"));
app.use(session(sessionOptions)); //middleware
app.use(flash());

app.use((req,res,next) => {
    res.locals.successMsg = req.flash.success;
    res.locals.errorMsg = req.flash.error;
    next()
})

app.set("view engine","ejs")
app.set(path.join(__dirname,"views"))

app.listen(3000,() => {
    console.log("app is listening on the port - 3000");
})

app.get('/',(req,res) => {
    res.send("This is home route")
})

app.get('/test',(req,res) => {
    // req.flash.success = "user registered!"
    res.cookie("age",20,{signed:true})
    console.log(req.signedCookies.age)
    res.send(`${req.cookies.name}`)
})

app.get('/register',(req,res) => {
    res.render("page.ejs");
})



