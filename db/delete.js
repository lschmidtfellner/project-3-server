import mongoose from 'mongoose';
import CarListing from '/Users/darious/code/Unit-3/Project/project-3-server/models/CarListing.js';
import User from '/Users/darious/code/Unit-3/Project/project-3-server/models/User.js';

async function deleteAllButOne() {
  try {
    await mongoose.connect('mongodb+srv://project:Super123@cluster0.gq4l35a.mongodb.net/UsedCar?retryWrites=true&w=majority'); // Connect to your MongoDB database

    // Delete all carlistings except the latest one
    const latestCarListing = await CarListing.findOne().sort({ _id: -1 });
    await CarListing.deleteMany({ _id: { $ne: latestCarListing._id } });

    // Delete all users except the first one
    const firstUser = await User.findOne().sort({ _id: 1 });
    await User.deleteMany({ _id: { $ne: firstUser._id } });

    console.log('Deletion completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error deleting data:', error);
    process.exit(1);
  }
}

deleteAllButOne();