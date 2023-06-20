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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const CarListing = mongoose.model('CarListing', carListingSchema);

module.exports = CarListing;