const express = require("express");
// const path = require("path")
const ejs_mate = require('ejs-mate')
const mongoose = require("mongoose");
const app = express();
const Listing = require('../Models/listing');
const router = express.Router(); //router creation
const methodOverride = require('method-override')
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing ,uploadMiddleware} = require("../middleware.js");
const multer = require('multer') //we are using this for image upload feature 
const {storage} = require("../cloudconfig.js") ///in place of destination folder we are using cloud storage
// const upload = multer({dest: "./pubilc/data/uploads/"})
const upload = multer({storage,limits:{
    filesize: 50*1024*1024 //50 mb max
}})

//follows mvc architecher use controller file to store all the controller function codes 
const listingController = require("../controllers/listing.js")

//listing validation schema using joy 

//Home route combination get and post request 
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, uploadMiddleware,function(req,res,next){
        try {
            console.log(req.files);
            const images = req.files["images"] || [];
            const videos = req.files["videos"] || [];
        
            console.log("Images:", images);
            console.log("Videos:", videos);
        
            res.send({
              message: "Upload successful",
              images,
              videos
            });
          } catch (err) {
            next(err);
          }
    });
    

//crate route 
router.get("/new", isLoggedIn, listingController.renderNewForm)

router.route("/:id")
    .get(wrapAsync(listingController.showList))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, listingController.updateList)
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteList));

//edit route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;
