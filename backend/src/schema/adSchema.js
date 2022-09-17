const mongoose = require("mongoose")
const Company = require("./companySchema")

// ads schema was modelled after the data in the sample spreadsheet
const adsSchema = mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: true
    },
    primaryText: {
        type: String,
        required: true
    },
    headline: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    CTA: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
})

const Ads = mongoose.model("ads", adsSchema) 

module.exports = Ads