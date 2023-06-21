import CarInfo from '../models/CarInfo.js';

const carController = {
  getAllCarInfo: async (req, res) => {
    try {
      const carInfo = await CarInfo.find();
      res.status(200).json(carInfo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default carController;