const mongoose = require('mongoose');

const carListingSchema = new mongoose.Schema({
    Make: {
        type: String,
    },
    Model: {
        type: String,
    },
    Year: {
        type: Number,
    },
    Category: {
        type: String,
    },
    Mileage: {
        type: Number,
    },
    Condition: {
        type: String,
    },
    Description: {
        type: String,
    },
});

const CarListing = mongoose.model('CarListing', carListingSchema);

module.exports = CarListing;