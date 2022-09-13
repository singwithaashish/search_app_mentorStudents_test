const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }
})

const Company = mongoose.model("company", companySchema)

module.exports = Company