const Joi = require('joi'); //use for schema validations

module.exports.listingSchema = Joi.object({
    //first of all I will check if my complete listing is valid or not 
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image : Joi.string().allow("",null), //empty and null are also allowed 
        price: Joi.number().required().min(0),
        country: Joi.string().required(),
        location: Joi.object({
            pincode: Joi.string().trim().required(),
            state: Joi.string().trim().required(),
            city: Joi.string().trim().required(),
            area: Joi.string().trim().required(),
        }).required(),
        gender: Joi.string().valid("boy", "girl", "unisex").required(),
        amenities: Joi.alternatives().try(
            //either user will select multiple values or the user will select single value 
            Joi.array().items(
                Joi.string().valid("Balcony Available", "Air conditioner", "Attached washroom")
            ),
            Joi.string().valid("Balcony Available", "Air conditioner", "Attached washroom")
        ).optional(),
        services: Joi.alternatives().try(
            Joi.array().items(
                Joi.string().valid("Hot and fresh meals", "Wifi services", "Laundary services")
            ),
            Joi.string().valid("Hot and fresh meals", "Wifi services", "Laundary services")
        ).optional()
    }).required() //This should be object and this should be required 
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required()
    }).required()
})