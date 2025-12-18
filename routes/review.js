const express = require("express");
// const path = require("path")
const ejs_mate = require('ejs-mate')
const mongoose = require("mongoose");
const app = express();
const path = require("path")
const Listing = require('../Models/listing');
const methodOverride = require('method-override')
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js")
const Review = require("../Models/review.js");
const {isLoggedIn,validateReview,isReviewAuthor} = require("../middleware.js"); //for authentication 
const router = express.Router({mergeParams:true});

//review validation schema using joy



router.post('/',isLoggedIn,validateReview,wrapAsync(async (req,res) => {
    
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    newReview.author = req.user._id;
    //first push the model object then save it 
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${req.params.id}`);
    // let id = req.params.id;
    // let rev = req.body.review;
    // console.log(rev)
    // let newReview = new Review(rev);
    // let result = await newReview.save();
    // console.log(result)
    // let list = await Listing.findById(id);
    // let result2 = await list.reviews.push(result);
    // console.log(result2);
}))

//delete route for reviews -- 
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAsync(async (req,res) => {
    const {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted succesfully!!")
    res.redirect(`/listings/${id}`);
}))


module.exports = router;