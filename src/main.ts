import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config"

async function bootstrap() {
  // Create a new app instance
  const app = await NestFactory.create(AppModule);

  // Get the config service to read configuration values.
  const config_service = app.get<ConfigService>(ConfigService);
  const port = config_service.get<number>('port');

  await app.listen(3000);
}
bootstrap();
