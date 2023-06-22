import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const originalExtension = file.originalname.split('.').pop();
    cb(null, uniqueSuffix + '.' + originalExtension);
  }
});

export const upload = multer({ storage: storage });

async function uploadImages(req, res) {
  try {
    console.log('Received request to upload images');

    const imageFilePaths = req.files.map((file) => file.path);
    console.log('Image file paths:', imageFilePaths);

    res.status(200).json({ message: 'Images uploaded successfully', imagePaths: imageFilePaths });
  } catch (error) {
    console.log('Error while uploading images:', error);

    res.status(500).json({ error: 'Failed to upload images' });
  }
}

export default {
  uploadImages
};

