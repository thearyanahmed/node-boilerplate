import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config"
import { LoggerService, LogLevel } from "@nestjs/common"
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from "nest-winston"

async function bootstrap() {
  // Create a new app instance
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // const logger = await app.get(LoggerService)
  // const logLevel : LogLevel = "log"
  // logger.setLogLevels(logLevel)

  // logger.log("this is a new logger")
  // Get the config service to read configuration values.
  const config_service = app.get<ConfigService>(ConfigService);
  const port = config_service.get<number>('port');

  await app.listen(port);
}
bootstrap();
