import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation.pipe';
import { ResponseInterceptor } from './interceptors/response.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const log = new Logger()
  const config = new DocumentBuilder()
    .setTitle('BULULU API')
    .setDescription('endpoints para integrar')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  const port = 4000;
  await app.listen(port);
  log.log('Server listen',(await app.getUrl()).toString())
}
bootstrap()
