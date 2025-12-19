const express = require("express");
// const path = require("path")
const ejs_mate = require('ejs-mate')
const mongoose = require("mongoose");
const app = express();
const Listing = require('../Models/listing');
const router = express.Router(); //router creation
const methodOverride = require('method-override')
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require('multer')
const {storage} = require("../cloudconfig.js")
// const upload = multer({dest: "./pubilc/data/uploads/"})
const upload = multer({storage})

//follows mvc architecher use controller file to store all the controller function codes 
const listingController = require("../controllers/listing.js")

//listing validation schema using joy 

//Home route combination get and post request 
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,validateListing, upload.single('listing[image]'),wrapAsync(listingController.saveList))
    

//crate route 
router.get("/new", isLoggedIn, listingController.renderNewForm)

router.route("/:id")
    .get(wrapAsync(listingController.showList))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, listingController.updateList)
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteList));

//edit route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;
