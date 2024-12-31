import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // 静态文件所在目录
      serveRoot: '/uploads', // URL 前缀
    }),
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
