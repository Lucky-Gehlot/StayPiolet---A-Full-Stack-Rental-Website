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
const {listingSchema} = require("./schema.js"); //for validation
const {reviewSchema} = require("./schema.js");
const Review = require("./Models/review.js");

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

//review validation schema using joy
const validateReview = (req,res,next) => {
    let {err} = reviewSchema.validate(req.body);
    if(err){
        let errMsg = err.details.map((el) => el.message).join(",");
        throw new ExpressError(404,errMsg);
    }else{
        next(); //no error middleware
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

app.get('/listings/:id',wrapAsync(async (req,res) => {
    let id = req.params.id;
    let card = await Listing.findById(id).populate("reviews")
    res.render("listings/show.ejs",{card})
}));

//edit route
app.get('/listings/:id/edit',wrapAsync(async (req,res) => {
    let id = req.params.id;
    let card = await Listing.findById(id);
    res.render("listings/edit.ejs",{card});
}));

//updateroute
app.put('/listings/:id',validateListing,async (req,res) => {
    let id = req.params.id;
    await Listing.findByIdAndUpdate(id, {...req.body.listing}); //deconstruct req.body.listing
    res.redirect(`/listings/${id}`);
})


app.delete('/listings/:id',wrapAsync(async (req,res) => {
    let id = req.params.id;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted)
    res.redirect("/listings")
}));


//post route for reviews - 
app.post('/listings/:id/reviews',validateReview,wrapAsync(async (req,res) => {
    
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

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
}

))

//delete route for reviews -- 
app.delete('/listings/:id/reviews/:reviewId', wrapAsync(async (req,res) => {
    const {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}))


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

// const addReview = async (req,res) => {
//     let rev = [
//         {
//             "comment": "I was thoroughly impressed with the attention to detail and the prompt response from the support team. The user interface is intuitive, and the setup process was far smoother than I anticipated. This product has genuinely improved my workflow significantly, making it well worth the investment. Highly recommend it to anyone looking for a reliable and efficient solution.",
//             "rating": 5,
//             "createdAt": "2025-11-23T15:05:40.000Z"
//         },
//         {
//             "comment": "While the core functionality is solid, I encountered several minor bugs, particularly when using the application on a mobile device. The documentation provided was vague on a few key features, leading to some initial frustration. It's a decent offering overall, but definitely needs a patch for stability and clearer instructions for new users to earn a higher rating.",
//             "rating": 3,
//             "createdAt": "2025-11-20T10:18:22.000Z"
//         },
//         {
//             "comment": "Unfortunately, my experience was quite poor. The product broke down within the first week of use, and attempts to contact customer service were met with long hold times and unhelpful representatives. I expected a much higher level of quality and support for the price point. This was a significant disappointment, and I would strongly advise potential buyers to look elsewhere.",
//             "rating": 1,
//             "createdAt": "2025-11-15T21:45:00.000Z"
//         },
//         {
//             "comment": "This is a great product for its category. It performs exactly as advertised and offers several unique features that distinguish it from competitors. My only constructive criticism would be that the initial learning curve is a bit steep, and a more extensive tutorial video series would be beneficial. Otherwise, it's a solid, reliable, and powerful tool that I plan to continue using daily.",
//             "rating": 4,
//             "createdAt": "2025-11-18T09:30:15.000Z"
//         },
//         {
//             "comment": "Outstanding! From the moment I started using it, everything felt polished and professional. The speed and reliability are unmatched, and the design is both elegant and highly functional. It solved a long-standing problem for me, and the continuous updates show the developers are committed to excellence. This is the new gold standard in this space.",
//             "rating": 5,
//             "createdAt": "2025-11-22T08:00:05.000Z"
//         },
//         {
//             "comment": "It's acceptable, nothing more. It gets the job done most of the time, but the inconsistent performance, especially during peak usage hours, prevents me from giving it a higher score. I've had to restart the application several times, which disrupts productivity. If they can fix the intermittent stability issues, it has the potential to be a 4 or 5-star product.",
//             "rating": 3,
//             "createdAt": "2025-11-10T14:55:30.000Z"
//         },
//         {
//             "comment": "I can't believe how poorly optimized this application is. It constantly drains my battery, and the loading times are excruciatingly slow, even on a high-end device. It feels like a beta version that was rushed to market without proper testing. I'm actively looking for an alternative because this one is simply not usable for serious work. A waste of time and money.",
//             "rating": 1,
//             "createdAt": "2025-11-05T17:20:10.000Z"
//         },
//         {
//             "comment": "A surprisingly robust and feature-rich tool for the price. I appreciate the vast array of customization options available, allowing me to tailor it perfectly to my needs. The community forum has also been an excellent resource for troubleshooting and discovering advanced tips. While I wish a few more integrations were available, I am extremely satisfied with my purchase.",
//             "rating": 4,
//             "createdAt": "2025-11-12T11:40:00.000Z"
//         },
//         {
//             "comment": "Simply the best iteration yet. Every aspect, from performance to aesthetics, feels refined and deliberate. The new features introduced in the last update are game-changers, addressing almost all the feedback from the previous version. It sets a new benchmark for quality and user experience in the industry.",
//             "rating": 5,
//             "createdAt": "2025-11-23T12:08:50.000Z"
//         },
//         {
//             "comment": "I'm on the fence about this one. It performs better than average, but the mandatory subscription model feels aggressive for the feature set provided. It lacks that 'killer' feature that would justify the recurring cost. It's functional, but there are better-priced options available that offer comparable utility without the constant pressure to renew.",
//             "rating": 2,
//             "createdAt": "2025-11-01T20:00:00.000Z"
//         }
//     ]

//     let revRes = await Review.insertMany(rev);
//     const reviewIds = revRes.map(review => review._id);
//     // let result = await Review.insertMany(rev);
//     let list = await Listing.findById('691ee69fa1f1e7930387fb28');
//     list.reviews.push(...reviewIds);

//     let result = list.save();
//     console.log(result)
    
// }


