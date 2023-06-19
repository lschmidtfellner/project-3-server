const mongoose = require('mongoose');
const CarListing = require('../models/CarListing');
const data = require('./Car_info.json');
const connectToMongoDB = require('./connection');
const fs = require('fs');


async function seedData() {
    try {
      const data = require('./Car_info.json');
      const carListings = data.results; // Access the car listings from the "results" key
  
      for (let i = 0; i < carListings.length; i++) {
        const carListing = new CarListing(carListings[i]);
        await carListing.save();
        console.log('Inserted car listing:', carListing);
      }
  
      console.log('Data seeded successfully');
      mongoose.connection.close();
    } catch (error) {
      console.error('Error seeding data:', error);
      mongoose.connection.close();
    }
  }

  async function seed() {
    await connectToMongoDB(); // Call the connectToMongoDB function to establish the database connection
    await seedData(); // Call the seedData function to seed the data
  }  
  
  seedData();
  
  