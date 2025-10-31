const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Check if Cloudinary credentials are provided
const hasCloudinaryConfig = process.env.CLOUDINARY_CLOUD_NAME && 
                           process.env.CLOUDINARY_API_KEY && 
                           process.env.CLOUDINARY_API_SECRET;

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn('⚠️  Cloudinary credentials not found. File uploads will be disabled.');
}

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } }); // 100MB max

async function uploadVideoToCloudinary(buffer) {
  if (!hasCloudinaryConfig) {
    throw new Error('Cloudinary not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.');
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
        folder: 'edunexus_lectures',
        allowed_formats: ['mp4', 'webm', 'ogg', 'mov', 'flv', 'avi'],
        access_mode: 'public', // Ensure public access
        type: 'upload', // Standard upload type
        invalidate: true, // Clear cache
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          console.log('Cloudinary upload success:', result.secure_url);
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });
}

async function uploadDocumentToCloudinary(buffer, originalName) {
  if (!hasCloudinaryConfig) {
    throw new Error('Cloudinary not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.');
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto', // Handles images and raw files
        folder: 'edunexus_documents',
        allowed_formats: ['pdf', 'png', 'jpg', 'jpeg'],
        public_id: `${Date.now()}_${originalName?.split('.')[0] || 'document'}`,
        access_mode: 'public', // Ensure public access
        type: 'upload', // Standard upload type
        invalidate: true, // Clear cache
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          console.log('Cloudinary upload success:', result.secure_url);
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });
}

// Generate a signed URL for secure access to files
function generateSignedUrl(publicId, resourceType = 'auto') {
  if (!hasCloudinaryConfig) {
    return null;
  }
  
  try {
    return cloudinary.url(publicId, {
      resource_type: resourceType,
      sign_url: true,
      type: 'upload',
      expires_at: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
    });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return null;
  }
}

module.exports = { 
  cloudinary, 
  upload, 
  uploadVideoToCloudinary, 
  uploadDocumentToCloudinary,
  generateSignedUrl 
};

