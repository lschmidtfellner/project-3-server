const mongoose = require('mongoose');

const carListingSchema = new mongoose.Schema({
    make: {
        type: String,
    },
    model: {
        type: String,
    },
    year: {
        type: Number,
    },
    category: {
        type: String,
    },
    mileage: {
        type: Number,
    },
    condition: {
        type: String,
    },
    description: {
        type: String,
    },
});

const CarListing = mongoose.model('CarListing', carListingSchema);

module.exports = CarListing;