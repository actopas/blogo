'use server';

import cuid2 from '@paralleldrive/cuid2';
import imageType from 'image-type';
// import { readChunk } from 'read-chunk';
import sharp from 'sharp';

import { OSS_UPLOAD_DIR } from '@/config';

import { ERROR_NO_PERMISSION } from '@/constants';
import { noPermission } from '@/features/user';
import { aliOSS } from '@/lib/ali-oss';

// Get the image type information of the file
const getImageInfo = async (buffer: Buffer) => {
  const typeInfo = await imageType(buffer);
  return {
    info: typeInfo,
    isImage: Boolean(typeInfo),
    isGif: typeInfo ? typeInfo.ext === 'gif' : false,
    isWebp: typeInfo ? typeInfo.ext === 'webp' : false,
  };
};

// Compress the image and return the compressed Buffer
const compressImage = async (buffer: Buffer): Promise<Buffer> => {
  const { isGif, isImage, isWebp } = await getImageInfo(buffer);

  if (!isImage || isWebp) {
    // If it's not an image or already a webp format, return the original Buffer
    return buffer;
  }

  let animated = false;
  if (isGif) {
    animated = true;
  }

  // Compress the image using sharp and return the Buffer in webp format
  const compressedBuffer = await sharp(buffer, {
    animated,
    limitInputPixels: false,
  })
    .webp({ lossless: true })
    .toBuffer();

  return compressedBuffer;
};

// Upload file to Aliyun OSS
const uploadToOSS = async (buffer: Buffer, fileName: string) => {
  const fileExtension = fileName.split('.').pop();
  const fileNameWithoutExtension = fileName.replace(`.${fileExtension}`, '');
  const uniqueFileName = `${fileNameWithoutExtension}-${cuid2.createId()}.${fileExtension}`;

  // Upload file to Aliyun OSS
  const { name } = await aliOSS.put(
    `${OSS_UPLOAD_DIR}/${uniqueFileName}`,
    buffer,
  );
  let url = aliOSS.generateObjectUrl(name);

  if (url) {
    url = url.replace(/http:\/\//g, 'https://'); // Ensure using https
  }

  return url;
};

// Handle file upload
export const uploadFile = async (
  formData: FormData,
): Promise<{ error?: string; url?: string }> => {
  // Permission check
  if (await noPermission()) {
    return { error: ERROR_NO_PERMISSION.message };
  }

  // Get the uploaded file
  const file = formData.get('file') as File;
  if (!file) {
    return { error: 'No file provided.' };
  }

  // Convert the file to a Buffer for processing
  const fileArrayBuffer = await file.arrayBuffer();
  let buffer = Buffer.from(fileArrayBuffer);

  // Compress image (if it's an image)
  buffer = await compressImage(buffer);

  // Upload to OSS and get URL
  const ossURL = await uploadToOSS(buffer, file.name);

  // Return the URL of the upload result
  return { url: ossURL };
};
