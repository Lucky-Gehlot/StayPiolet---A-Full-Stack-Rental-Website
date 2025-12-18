const Joi = require('joi'); //use for schema validations

module.exports.listingSchema = Joi.object({
    //first of all I will check if my complete listing is valid or not 
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image : Joi.string().allow("",null), //empty and null are also allowed 
        price: Joi.number().required().min(0),
        country: Joi.string().required(),
        location: Joi.string().required()
    }).required() //This should be object and this should be required 
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required()
    }).required()
})