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
      const searchQuery = { ...req.query }; // Copy the req.query object
  
      // Perform the search using the search query
      const carInfo = await CarInfo.find(searchQuery);
  
      res.status(200).json(carInfo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
};


export default carController;