const mongoose = require('mongoose');
const { title } = require('process');
const review = require('./review');
const { type } = require('os');
const Schema = mongoose.Schema; //to prevent repeatations
const Review = require("./review.js")

const listingSchema = new Schema({
   title:{
    type:String,
    required:true,
   },
   description:String,
   image:{
      url:String,
      filename: String,
   }, //image url will also be a string
   price:Number,
   location:String,
   country:String,
   reviews:[
      {
         type:Schema.Types.ObjectId,
         ref:"Review"
      }
   ],
   owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
   }
});

listingSchema.post("findOneAndDelete",async (listing) => {
   if(listing){
      await Review.deleteMany({_id: {$in: listing.reviews}})
   }
});

const Listing = mongoose.model("Listing", listingSchema)


module.exports = Listing;

//edit karte time and create karte time i need to add a check for checking all the images 