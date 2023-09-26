import dotenv from 'dotenv'
import cloudinary from 'cloudinary'

dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true 
})

export function deleteImageFromCloudinary(id) {
    cloudinary.v2.uploader.destroy(id)
        .then(() => {
            console.log('image deleted')
        });
}