import fs from 'fs';
import path from 'path';
import multer from 'multer';
import sharp from 'sharp';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/compressed');
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

    if (!req.files || req.files.length === 0) {
      console.log('No files to upload. Continuing with the rest of the code.');
      res.status(200).json({ message: 'No files to upload' });
      return;
    }

    const compressedDirectory = 'uploads/compressed';
    const compressedFilePaths = await Promise.all(
      req.files.map(async (file) => {
        const compressedFilename = `${file.filename.split('.')[0]}_compressed.${file.filename.split('.')[1]}`;
        const compressedFilePath = path.join(compressedDirectory, compressedFilename);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(compressedDirectory)) {
          fs.mkdirSync(compressedDirectory, { recursive: true });
        }

        await sharp(file.path)
          .resize({ width: 800 }) // Optional: Resize the image to a desired width
          .jpeg({ quality: 80 }) // Compress the image and set JPEG quality
          .toFile(compressedFilePath);

        return compressedFilePath;
      })
    );

    console.log('Compressed file paths:', compressedFilePaths);

    res.status(200).json({ message: 'Images uploaded and compressed successfully', compressedFilePaths });
  } catch (error) {
    console.log('Error while uploading and compressing images:', error);
    res.status(500).json({ error: 'Failed to upload and compress images' });
  }
}

export default {
  uploadImages
};
