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

const session = require("express-session");
const flash = require('connect-flash');
const passport = require("passport");
const LocalStratergy = require("passport-local")
const User = require("./Models/user.js")

const reviewRouter = require('./routes/review.js') //I am just requiring the routes 
const listingRouter = require('./routes/listing.js')
const userRouter = require('./routes/user.js')

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

const sessionOptions = {
    secret:"MySuperSecret",
    resave:false,
    saveUninitialized:true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly:true //we keep it true for security purposes
    }
}

app.use(session(sessionOptions))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStratergy(User.authenticate()))



passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user;
    next();
})

const port = 8080;

app.listen(port,() => {
    console.log("app is listening on the port - ",port)
})

app.get("/demoUser", async (req,res) => {
    let fakeUser = new User({
        email:"student@gmail.com",
        username:"delta-student", //i can give username because i 
        // initialized passport and passport will automatically done 
        // this thing for me 
    })


    let registeredUser = await User.register(fakeUser,"helloworld"); //user,password
    res.send(registeredUser);

});

app.use('/listings',listingRouter);
app.use('/listings/:id/reviews',reviewRouter);
//post route for reviews - 
app.use("/", userRouter);

app.get('/privacy',(req,res) => {
    res.render("privacy.ejs")
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


