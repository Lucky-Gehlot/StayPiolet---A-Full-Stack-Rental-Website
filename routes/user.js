const express = require("express")
const router = express.Router();
const User = require("../Models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport")
const {saveRedirectUrl} = require("../middleware.js")

router.get("/signup", (req,res) => {
    res.render("users/signup.ejs");
})

//now we succesfully included wrapAsync ab wrapAsync se 
//normal apni error handling to ho jayegi but ye apan ko ek bilkul 
// lost page 
//par le jayega but we want ki agar error aati hai then 
// apna flash message ek baar display ho then 
//wapas apan apne signup wale page par hi aa jaye for that 
// we will use 
//try catch block and in the catch i will take the error 
// and i will redirect
//to my original signup page for further trials


router.post("/signup",wrapAsync(async (req,res) => {
    try{
        const {username,email,password} = req.body;
        const newUser = new User({email,username})
        const registeredUser = await User.register(newUser,password) //authentication
        console.log(registeredUser)
        //Now i want ki jaise hi mera user signup ho jaye i will automatically login my user 
        req.login(registeredUser,(err) => {
            if(err){
                return next(err);
            }
            //if user successfully logined then flash greeting msg
            req.flash("success",`Welcome to StayPiolet, ${username}`)
            res.redirect("/listings")
        })
        
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }
}))

router.get('/login',(req,res) => {
    res.render("users/login.ejs");
})

//now failureflash true karne se it will automatically generate flash message 
router.post('/login',saveRedirectUrl,passport.authenticate("local" , { 
    failureRedirect: '/login', 
    failureFlash: true }),
    async (req,res) => {
    //user ko check karne ka kaam ki user exist kartha hai ya nhi 
    //karthe that will be done by passport
    req.flash("success","Welcome back to StayPiolet, You are logged in!!");
    if(!res.locals.redirectUrl) res.locals.redirectUrl = '/listings'
    res.redirect(res.locals.redirectUrl)
})

router.get('/logout',(req,res,next) => {
    //note - req.logout() will by default take a callback as a parameter 
    req.logout((err) => {
        if(err) return next(err);
        req.flash("success","You are logged out successfully!!");
        res.redirect("/listings");
    })
})

module.exports = router;