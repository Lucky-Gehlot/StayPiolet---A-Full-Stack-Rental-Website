const express = require("express");
// const path = require("path")
const ejs_mate = require('ejs-mate')
const mongoose = require("mongoose");
const app = express();
const Listing = require('../Models/listing'); 
const router = express.Router(); //router creation
const methodOverride = require('method-override')
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

//listing validation schema using joy 


router.get("/",wrapAsync(async (req,res) => {
    
    const allListings = await Listing.find();
    res.render("listings/listings.ejs",{allListings});
  
}))

//create route

router.get("/new",isLoggedIn,(req,res) => {
    console.log(req.user) //jaise hi user login hota hai req object me 
    //apna user save ho jayega 
    res.render("listings/new.ejs")
})

router.post("/",validateListing,wrapAsync(async(req,res,next) => {
        // let result = listingSchema.validate(req.body);
        // console.log(result)
        // if(result.error){
        //     throw new ExpressError(400,result.error)
        // }
        let newListing = new Listing(req.body.listing);
        // if(!req.body.listing.price) next(new ExpressError(404,"Send price"))
        // if(!req.body.listing.title) next(new ExpressError(404,"Send title"))
        //first of all i want to verify the image link
        
        newListing.owner = req.user._id; //new listing create hote hi uska owner add kar do
        await newListing.save();
        req.flash("success","New listing created!");
        res.redirect('/listings');})
)

//show route
//user can see the listing withput logged in 
router.get('/:id',wrapAsync(async (req,res) => {
    let id = req.params.id;
    //now over here i want ki meri listing bhi populate ho jaye and har ek 
    //listing me jo review hai vo bhi populate ho jaye for this we have to use nested popping 
    let card = await Listing.findById(id).populate({path:"reviews", populate:{
        path:"author",
    },
}).populate("owner")
    console.log(card)
    res.render("listings/show.ejs",{card})
}));

//edit route
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(async (req,res) => {
    let id = req.params.id;
    let card = await Listing.findById(id);
    if(!card) req.flash("error","Listing you request for does not exist");
    res.render("listings/edit.ejs",{card});
}));

//updateroute
router.put('/:id',isLoggedIn,isOwner,validateListing,async (req,res) => {
    let id = req.params.id;
    //Do authorization here ---
    // let list = await Listing.findById(id);
    // if(res.locals.currUser && !list.owner._id.equals(res.locals.currUser._id)){
    //     req.flash("error","You dont have permission to update this listing")
    //     return res.redirect(`/listings/${id}`);
    // }
    //You dont need to do the authorization because you added middleware
    await Listing.findByIdAndUpdate(id, {...req.body.listing}); 
    //deconstruct req.body.listing
    req.flash("success","Listing edited succesfully!")
    res.redirect(`/listings/${id}`);
})


router.delete('/:id',isLoggedIn,isOwner,wrapAsync(async (req,res) => {
    let id = req.params.id;
    let deleted = await Listing.findByIdAndDelete(id);
    req.flash("success","Deleted succesfully!")
    console.log(deleted)
    res.redirect("/listings")
}));

module.exports = router;
