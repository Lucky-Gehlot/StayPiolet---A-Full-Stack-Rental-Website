const Listing = require("../Models/listing")

module.exports.index = async (req,res) => {
    const allListings = await Listing.find();
    res.render("listings/listings.ejs",{allListings});
  
}


module.exports.renderNewForm = (req,res) => {
    console.log(req.user) //jaise hi user login hota hai req object me 
    //apna user save ho jayega 
    res.render("listings/new.ejs")
}

module.exports.saveList = async(req,res,next) => {
        // let result = listingSchema.validate(req.body);
        // console.log(result)
        // if(result.error){
        //     throw new ExpressError(400,result.error)
        // }
        let url = req.file.path;
        let filename = req.file.filename;
        console.log(url,"..", filename)
        let newListing = new Listing(req.body.listing);
        newListing.image = {url,filename}; //add this two values in the image filed of our listing 
        // // if(!req.body.listing.price) next(new ExpressError(404,"Send price"))
        // // if(!req.body.listing.title) next(new ExpressError(404,"Send title"))
        // //first of all i want to verify the image link
        
        newListing.owner = req.user._id; //new listing create hote hi uska owner add kar do
        await newListing.save();
        req.flash("success","New listing created!");
        res.redirect('/listings');}


module.exports.showList = async (req,res) => {
    let id = req.params.id;
    //now over here i want ki meri listing bhi populate ho jaye and har ek 
    //listing me jo review hai vo bhi populate ho jaye for this we have to use nested popping 
    let card = await Listing.findById(id).populate({path:"reviews", populate:{
        path:"author",
    },
}).populate("owner")
    console.log(card)
    res.render("listings/show.ejs",{card})
}


module.exports.renderEditForm = async (req,res) => {
    let id = req.params.id;
    let card = await Listing.findById(id);
    if(!card) req.flash("error","Listing you request for does not exist");
    res.render("listings/edit.ejs",{card});
}


module.exports.updateList = async (req,res) => {
    let id = req.params.id;
    //Do authorization here ---
    // let list = await Listing.findById(id);
    // if(res.locals.currUser && !list.owner._id.equals(res.locals.currUser._id)){
    //     req.flash("error","You dont have permission to update this listing")
    //     return res.redirect(`/listings/${id}`);
    // }
    //You dont need to do the authorization because you added middleware
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing}); 

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename}
        await listing.save();
    }
    //deconstruct req.body.listing
    req.flash("success","Listing edited succesfully!")
    res.redirect(`/listings/${id}`);
}


module.exports.deleteList = async (req,res) => {
    let id = req.params.id;
    let deleted = await Listing.findByIdAndDelete(id);
    req.flash("success","Deleted succesfully!")
    console.log(deleted)
    res.redirect("/listings")
}