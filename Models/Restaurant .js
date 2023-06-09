const mongoose = require('mongoose')

const restaurentSchema = mongoose.Schema({



    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: [{

        name: String,
        description: String,
        price: Number,
        image: String
    }]
})

const RestaurentModel = mongoose.model("restaurent", restaurentSchema)

module.exports = { RestaurentModel }