const mongoose = require('mongoose')

const ClassifiedSchema = mongoose.Schema({
    name: String,
    description: String,
    category: String,
    image: String,
    location: String,
    postedAt: String,
    price: String
})

const ClassifiedModel = mongoose.model("classified",ClassifiedSchema)

module.exports = {ClassifiedModel}