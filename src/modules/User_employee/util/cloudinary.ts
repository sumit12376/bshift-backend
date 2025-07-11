import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: 'duyrdbqgw',
  api_key: '262268678722597',
  api_secret: 'fzombRFb2MHYWejZ8elCdexcmcA',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: Date.now() + '-' + file.originalname,
  }),
});

const upload = multer({ storage });

export { upload, cloudinary };
