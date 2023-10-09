import mongoose from "mongoose";

const carInfoSchema = new mongoose.Schema({
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
    Price: {
        type: Number,
    }
}, {collection: 'Car-Info'});

const CarInfo = mongoose.model('CarInfo', carInfoSchema);

export default CarInfo;