declare module 'multer-storage-cloudinary' {
  import { StorageEngine } from 'multer';
  import { ConfigOptions, UploadApiResponse } from 'cloudinary';

  export interface CloudinaryStorageOptions {
    cloudinary: any;
    params?: {
      folder?: string;
      format?: string;
      allowed_formats?: string[];
      public_id?: (req: Express.Request, file: Express.Multer.File) => string;
    };
  }

  export class CloudinaryStorage implements StorageEngine {
    constructor(options: CloudinaryStorageOptions);
  }
}
