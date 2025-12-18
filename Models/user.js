const mongoose = require("mongoose");
const {Schema} = mongoose;
//passport local is used for hashing of the password
//in the newer version of nodejs passportLocalMongoose will give you object
//but if you want function it means you default implementaion of it so you can
//acheive it by using default keyword 
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    //when you use passwordlocalmongoose pluggin then it will 
    // automatically set these two fields - username and password 
    // we didn't require to fill this detail again
    email: {
        type: String,
        required:true
    },
    
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema) //(name of the model, schema used for that model)

