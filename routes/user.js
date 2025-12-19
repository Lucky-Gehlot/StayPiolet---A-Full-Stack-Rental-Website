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

router.get('/logout',userController.logOut)

module.exports = router;