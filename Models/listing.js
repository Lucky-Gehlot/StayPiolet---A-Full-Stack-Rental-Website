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
   //when we upload file in cloudnary then there will be public_id and url we are storing puclic_id so that in future i can delete these images  from cloudinary
   images: [
      {
        path: String, //path will be cloudinary url 
        filename: String
      }
    ],
    videos: [
      {
        path: String,
        filename: String
      }
    ], //image url will also be a string
   price:Number,
   location:{
      pincode: {
         type: String,
         required: true
      },
      state: {
         type: String,
         required: true
      },
      city: {
         type: String,
         required: true
      },
      area: {
         type: String,
         required: true
      },
      coordinates: {
         lat: Number,
         lng: Number
      },
      fullAddress: String //HouseNo/FlatNo with landmark 
   },
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
   },
   category: {
      type: String,
      enum: ["single bed", "double bed", "more than 2 bed"]
   },
   gender:{
      type: String,
      enum: ["boy", "girl", "unisex"]
   },
   amenities:[{
      type: String,
      enum: ["Balcony Available", "Air conditioner", "Attached washroom","Power-Back Up","Lift","Water Cooler","Fridge","Microwave","First Aid Kit","Warden/Manager","Security Guard","Gym"]
   }],
   services: [{
      type: String,
      enum: ["Hot and fresh meals", "Wifi services", "Laundary services"]
   }],
   HouseRules: [{
      type: String,
      enum: ["Rent lock-in","No guardians stay"]
  }]
});

listingSchema.post("findOneAndDelete",async (listing) => {
   if(listing){
      await Review.deleteMany({_id: {$in: listing.reviews}})
   }
});

const Listing = mongoose.model("Listing", listingSchema)


module.exports = Listing;

//category - single bed 
//Gender 
//Amenties - balcony , air conditioning , attched washroom , 
//services - meals , wifi , laundry, 
//food menu  //later 
//colleges near pg 
//schedule a visit 
//edit karte time and create karte time i need to add a check for checking all the images 
//first of all look for required changes in the database 