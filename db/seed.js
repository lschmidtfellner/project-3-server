const mongoose = require('mongoose');
const User = require('../models/User'); 
const CarListing = require('../models/CarListing'); 
const connectToMongoDB = require('./connection');

// User data to be seeded
const usersData = [
    {
      username: 'john',
      email: 'john@example.com',
      password: 'password123',
    },
  ];
  
  // Car listings data to be seeded
  const carListingsData = [
    {
      Make: 'Toyota',
      Model: 'Camry',
      Year: 2018,
      Category: 'Sedan',
      Mileage: 50000,
      Condition: 'Used',
      Description: 'Lorem ipsum dolor sit amet.',
    },
    {
      Make: 'Honda',
      Model: 'Civic',
      Year: 2019,
      Category: 'Sedan',
      Mileage: 40000,
      Condition: 'Used',
      Description: 'Lorem ipsum dolor sit amet.',
    },
  ];
  
  async function seedData() {
    try {
      await connectToMongoDB(); // Establish the database connection
  
      await User.deleteMany(); // Remove existing users
      await CarListing.deleteMany(); // Remove existing car listings
  
      const createdUsers = await User.insertMany(usersData); // Insert the user data and get the created user objects
  
      for (const carListingData of carListingsData) {
        const carListing = new CarListing(carListingData);
        const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)]; // Assign a random user to the car listing
        carListing.user = randomUser;
        await carListing.save(); // Save the car listing to the database
      }
  
      console.log('Data seeded successfully!');
      process.exit(0); // Exit the process once seeding is complete
    } catch (error) {
      console.error('Error seeding data:', error);
      process.exit(1); // Exit the process with a failure code
    }
  }
  
  seedData();