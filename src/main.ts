import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  // Зчитуємо сертифікат та ключ
  const httpsOptions = {
    key: fs.readFileSync('C:\\Storage\\Code\\KPI\\Web\\localhost-key.pem'),
    cert: fs.readFileSync('C:\\Storage\\Code\\KPI\\Web\\localhost.pem'),
    minVersion: 'TLSv1.2', // Встановлюємо мінімальну версію TLS на 1.2
    maxVersion: 'TLSv1.2', // Встановлюємо максимальну версію TLS на 1.2
    ciphers: 'RSA',
    honorCipherOrder: true, // Забезпечує використання вказаних шифрів у заданому порядку
  };

  // Створюємо NestJS додаток з HTTPS
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  // Слухаємо на порту 3000
  await app.listen(3000);
}

bootstrap();
