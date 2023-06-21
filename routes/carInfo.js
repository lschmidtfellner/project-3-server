import express from 'express'
import carInfoController from '../controllers/car.js'

const router = express.Router();

// Car-Info Routes
router.get('/carinfo', carInfoController.getAllCarInfo);

export default router;