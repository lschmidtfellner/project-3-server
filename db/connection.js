const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Genpai999:Crazy99@cluster0.gq4l35a.mongodb.net/UsedCar?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      buffertimeoutMS: 50000,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongoDB;
