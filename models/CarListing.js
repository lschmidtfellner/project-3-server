import mongoose from 'mongoose';

const carListingSchema = new mongoose.Schema({
  Make: {
    type: String,
  },
  Model: {
    type: String,
  },
  Price: {
    type: Number,
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
    required: true,
  },
  image: {
    type: String,
    required: true
  },
});

const CarListing = mongoose.model('CarListing', carListingSchema);

export default CarListing;
