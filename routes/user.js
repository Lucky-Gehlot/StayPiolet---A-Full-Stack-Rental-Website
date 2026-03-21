const express = require("express")
const router = express.Router();
const User = require("../Models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport")
const {saveRedirectUrl} = require("../middleware.js")

const userController = require("../controllers/user.js")

router.get("/signup", userController.signRender)

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


router.post("/signup",wrapAsync(userController.signUp))

router.get('/login', userController.loginRender)

//now failureflash true karne se it will automatically generate flash message 
router.post('/login',saveRedirectUrl,passport.authenticate("local" , { 
    failureRedirect: '/login', 
    failureFlash: true }),
    userController.login)

router.get("/auth/google", (req, res, next) => {
    // If user came from a protected page, keep redirect working
    if (req.query?.returnTo) {
        req.session.redirectUrl = req.query.returnTo;
    }
    next();
}, passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/auth/google/callback",
    saveRedirectUrl,
    passport.authenticate("google", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req, res) => {
        req.flash("success", "Welcome back to StayPiolet (Google)!");
        const redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }
);

router.get('/logout',userController.logOut)

module.exports = router;