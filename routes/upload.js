import express from 'express';
import uploadController from '../controllers/upload.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
  res.send('Hello from the upload route!');
});

// Handle multiple image uploads
router.post('/', upload.array('images'), uploadController.uploadImages);

export default router;
