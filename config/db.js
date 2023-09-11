const mongoose = require('mongoose')
require('dotenv').config()

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connection = mongoose.connect(`mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASS}@cluster0.uibmoog.mongodb.net/olx?retryWrites=true&w=majority`,connectionParams)

module.exports = {connection}