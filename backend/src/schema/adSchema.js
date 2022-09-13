const mongoose = require("mongoose")

const adsSchema = mongoose.Schema({
    companyId: {
        type: String,
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
    imageURL: {
        type: String,
        required: true
    },
})

const Ads = mongoose.model("ads", adsSchema)

module.exports = Ads