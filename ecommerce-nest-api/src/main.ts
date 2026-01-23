import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // No 'Access-Control-Allow-Origin' header is present on the requested resource—when trying to get data from a REST API -> dùng cái này để cho phép fetch data như bình thường nữa
  // ban đầu ngáo ngơ định dùng corse-mode nhưng đó chả khác gì bảo server trả về json cho nhưng mà lại đừng để nó viewable -> fe không access được json -> toang
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
