const Review = require("../Models/review")
const Listing = require("../Models/listing")

module.exports.newReview = async (req,res) => {
    
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    console.log(newReview);
    newReview.author = req.user._id;
    //first push the model object then save it 
    listing.reviews.push(newReview);
    req.flash("success","review added succesfully......")
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

module.exports.deleteReview = async (req,res) => {
    const {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted succesfully!!")
    res.redirect(`/listings/${id}`);
}