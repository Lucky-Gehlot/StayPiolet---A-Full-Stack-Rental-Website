const User = require("../Models/user")

module.exports.signRender = (req,res) => {
    res.render("users/signup.ejs");
}

module.exports.signUp = async (req,res) => {
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
}


module.exports.loginRender = (req,res) => {
    res.render("users/login.ejs");
}


module.exports.login = async (req,res) => {
    //user ko check karne ka kaam ki user exist kartha hai ya nhi 
    //karthe that will be done by passport
    req.flash("success","Welcome back to StayPiolet, You are logged in!!");
    if(!res.locals.redirectUrl) res.locals.redirectUrl = '/listings'
    res.redirect(res.locals.redirectUrl)
}


module.exports.logOut = (req,res,next) => {
    //note - req.logout() will by default take a callback as a parameter 
    req.logout((err) => {
        if(err) return next(err);
        req.flash("success","You are logged out successfully!!");
        res.redirect("/listings");
    })
}