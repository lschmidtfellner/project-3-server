import CarInfo from '../models/CarInfo.js';

const carController = {
  getAllCarInfo: async (req, res) => {
    try {
      const carInfo = await CarInfo.find();
      res.status(200).json(carInfo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  searchCarInfo: async (req, res) => {
    try {
      const { make, model, year } = req.query;
  
      // Build the search query based on the provided query parameters
      const searchQuery = {};
      if (make) {
        searchQuery.make = make;
      }
      if (model) {
        searchQuery.model = model;
      }
      if (year) {
        searchQuery.year = year;
      }
  
      // Perform the search using the search query
      const carInfo = await CarInfo.find(searchQuery);
  
      res.status(200).json(carInfo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export default carController;