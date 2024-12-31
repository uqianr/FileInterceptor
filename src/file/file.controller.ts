import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as dayjs from 'dayjs';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'file',

      {
        storage: diskStorage({
          destination: (req, file, callback) => {
            const uploadPath = './uploads/images';
            if (!fs.existsSync(uploadPath)) {
              fs.mkdirSync(uploadPath, { recursive: true });
              callback(null, uploadPath);
            } else {
              callback(null, uploadPath);
            }
          },
          filename: (req, file, callback) => {
            const uniqueSuffix = dayjs().format('YYYYMMDDHHmmssSSS');
            const ext = extname(file.originalname);
            callback(null, `${uniqueSuffix}${ext}`);
          },
        }),
        fileFilter: (req, file, callback) => {
          console.log(file, 'file>>');

          callback(null, true);
        },
        limits: {
          fileSize: 0.0005 * 1024 * 1024, // 文件大小限制
        },
      },
    ),
  )
  create(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log(file, '>>>>>>>>>>>');
  }
}
