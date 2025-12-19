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
const reviewController = require("../controllers/review.js")

//review validation schema using joy



router.post('/',isLoggedIn,validateReview,wrapAsync(reviewController.newReview))

//delete route for reviews -- 
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview))


module.exports = router;