import express from 'express';
import uploadController from '../controllers/upload.js';
import multer from 'multer';
import CarListing from '../models/CarListing.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/compressed' });

router.get('/', (req, res) => {
  res.send('Hello from the upload route!');
});

// Handle multiple image uploads
//router.post('/', upload.array('images'), uploadController.uploadImages);
router.post('/', (req, res) => {
  CarListing.create(req.body)
    .then(() => {
      res.status(200).send('Car Listing was created')
    })
    .catch((err) => {
      res.status(404).send({status: 404, error: err})
  })
})

export default router;
