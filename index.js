const express = require("express");
// const path = require("path")
const ejs_mate = require('ejs-mate')
const mongoose = require("mongoose");
const app = express();
const Listing = require('./Models/listing'); //This is my model
const { title } = require("process");
const path = require("path")
const methodOverride = require('method-override')
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema} = require("./schema.js")

main()
    .then(() => {
        console.log("connection succesful")})
    .catch((err) => {console.log(err)
    })

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/stayPiolet");
}

app.set("view engine","ejs")

app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}))

app.use(methodOverride("_method"));

app.engine('ejs', ejs_mate);

const port = 8080;

app.listen(port,() => {
    console.log("app is listening on the port - ",port)
})

//listing validation schema using joy 
const validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404,errMsg);
    }else{
        next(); //no error 
    }
}

app.get("/listings",wrapAsync(async (req,res) => {
    
    const allListings = await Listing.find();
    res.render("listings/listings.ejs",{allListings});
  
}))

//create route

app.get("/listings/new",(req,res) => {
    res.render("listings/new.ejs");
})

app.post("/listings",validateListing,wrapAsync(async(req,res,next) => {
        // let result = listingSchema.validate(req.body);
        // console.log(result)
        // if(result.error){
        //     throw new ExpressError(400,result.error)
        // }
        let newListing = new Listing(req.body.listing);
        // if(!req.body.listing.price) next(new ExpressError(404,"Send price"))
        // if(!req.body.listing.title) next(new ExpressError(404,"Send title"))
        //first of all i want to verify the image link
        await newListing.save();
        res.redirect('/listings');})
)

//show route

app.get('/listings/:id',async (req,res) => {
    let id = req.params.id;
    let card = await Listing.findById(id)
    res.render("listings/show.ejs",{card})
})

//edit route
app.get('/listings/:id/edit',async (req,res) => {
    let id = req.params.id;
    let card = await Listing.findById(id);
    res.render("listings/edit.ejs",{card});
})

//updateroute
app.put('/listings/:id',validateListing,async (req,res) => {
    let id = req.params.id;
    await Listing.findByIdAndUpdate(id, {...req.body.listing}); //deconstruct req.body.listing
    res.redirect(`/listings/${id}`);
})


app.delete('/listings/:id',async (req,res) => {
    let id = req.params.id;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted)
    res.redirect("/listings")
})


app.all("/*path",(req,res,next) => {
    
    next(new ExpressError(400,"page not found"));
    
})

//do error handling part - 
app.use((err,req,res,next) => {
    let {statusCode = 800, message = "somrthing went wrong"} = err;
    res.status(statusCode).render("error.ejs",{message});
})

app.use((err,req,res,message) => {
    res.send("This called next middleware")
})

app.use((err,req,res,message) => {
    res.send("This called next to next middleware")
})

//page error solved (server side solved())

