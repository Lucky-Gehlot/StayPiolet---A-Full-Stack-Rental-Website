//I want to create common middleware so i will just write what will happen if 
//the user is not logged in, in the case of logged in I will use next()
//to call the next middleware...
const Listing = require("./Models/listing")
const Review = require("./Models/review")

const {listingSchema} = require("./schema.js"); 
const ExpressError = require("./utils/ExpressError.js")
const wrapAsync = require("./utils/wrapAsync.js")
const {reviewSchema} = require("./schema.js");
const multer = require('multer')
const {storage} = require("./cloudconfig.js") ///in place of destination folder we are using cloud storage
// const upload = multer({dest: "./pubilc/data/uploads/"})
const upload = multer({storage,limits:{
    filesize: 50*1024*1024 //50 mb max
}})
module.exports.isLoggedIn = (req,res,next) => {
    
    if(!req.isAuthenticated()){
        //redirect url save here 
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You are not logged in , Login first!")
        return res.redirect('/login')
    }
    next();
}

module.exports.uploadMiddleware = upload.fields([
    
        //we can set the limits in this case 
        { name: "images", maxCount: 5 },
        { name: "videos", maxCount: 2 }
    
])

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}


module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this list");
        return res.redirect(`/listings/${id}`);
    }
    next(); //agar sab kuch sahi hai then call next middleware 
}


module.exports.validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404,errMsg);
    }else{
        next(); //no error 
    }
}

module.exports.validateReview = (req,res,next) => {
    let {err} = reviewSchema.validate(req.body);
    if(err){
        let errMsg = err.details.map((el) => el.message).join(",");
        throw new ExpressError(404,errMsg);
    }else{
        next(); //no error middleware
    }
}

module.exports.isReviewAuthor = async (req,res,next) => {
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId)
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this review")
        return res.redirect(`/listings/${id}`)
    }
    next();
}

