import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      // Check if the size of the file is more than 1M
      if (file.size > 1000000) {
        throw new Error('Please upload a file size not more than 1M');
      }

      // Check if the file is an image
      if (!file.mimetype.startsWith('image')) {
        throw new Error('Sorry, this file is not an image, please try again');
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'lvior' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteFile(public_id: string): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const deleteStream = cloudinary.uploader.destroy(
        public_id,
        { invalidate: true },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      return deleteStream;
    });
  }
}
