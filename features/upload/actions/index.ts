'use server';

import cuid2 from '@paralleldrive/cuid2';
import imageType from 'image-type';
// import { readChunk } from 'read-chunk';
import sharp from 'sharp';

import { OSS_UPLOAD_DIR } from '@/config';

import { ERROR_NO_PERMISSION } from '@/constants';
import { noPermission } from '@/features/user';
import { aliOSS } from '@/lib/ali-oss';

// 获取文件的图片类型信息
const getImageInfo = async (buffer: Buffer) => {
  const typeInfo = await imageType(buffer);
  return {
    info: typeInfo,
    isImage: Boolean(typeInfo),
    isGif: typeInfo ? typeInfo.ext === 'gif' : false,
    isWebp: typeInfo ? typeInfo.ext === 'webp' : false,
  };
};

// 压缩图片并返回压缩后的 Buffer
const compressImage = async (buffer: Buffer): Promise<Buffer> => {
  const { isGif, isImage, isWebp } = await getImageInfo(buffer);

  if (!isImage || isWebp) {
    // 不是图片或者已经是 webp 格式则直接返回原 Buffer
    return buffer;
  }

  let animated = false;
  if (isGif) {
    animated = true;
  }

  // 使用 sharp 压缩图片并返回 webp 格式的 Buffer
  const compressedBuffer = await sharp(buffer, {
    animated,
    limitInputPixels: false,
  })
    .webp({ lossless: true })
    .toBuffer();

  return compressedBuffer;
};

// 上传文件到阿里云 OSS
const uploadToOSS = async (buffer: Buffer, fileName: string) => {
  const fileExtension = fileName.split('.').pop();
  const fileNameWithoutExtension = fileName.replace(`.${fileExtension}`, '');
  const uniqueFileName = `${fileNameWithoutExtension}-${cuid2.createId()}.${fileExtension}`;

  // 上传文件到 OSS
  const { name } = await aliOSS.put(
    `${OSS_UPLOAD_DIR}/${uniqueFileName}`,
    buffer,
  );
  let url = aliOSS.generateObjectUrl(name);

  if (url) {
    url = url.replace(/http:\/\//g, 'https://'); // 确保使用 https
  }

  return url;
};

// 处理文件上传
export const uploadFile = async (
  formData: FormData,
): Promise<{ error?: string; url?: string }> => {
  // 权限检查
  if (await noPermission()) {
    return { error: ERROR_NO_PERMISSION.message };
  }

  // 获取上传的文件
  const file = formData.get('file') as File;
  if (!file) {
    return { error: 'No file provided.' };
  }

  // 将文件转换为 Buffer 进行处理
  const fileArrayBuffer = await file.arrayBuffer();
  let buffer = Buffer.from(fileArrayBuffer);

  // 压缩图片（如果是图片）
  buffer = await compressImage(buffer);

  // 上传到 OSS 并获取 URL
  const ossURL = await uploadToOSS(buffer, file.name);

  // 返回上传结果的 URL
  return { url: ossURL };
};
