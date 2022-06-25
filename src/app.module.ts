import { Module, Logger} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from "./shared/shared.module"
import { utilities as nestWinstonModuleUtilities, WinstonModule } from "nest-winston"
import * as winston from "winston"

@Module({
  imports: [
    WinstonModule.forRoot({
        transports: [
          (process.env.LOG_CHANNEL === 'file') ?
            new winston.transports.File({
              filename: 'logger/logfile.log',
              level: process.env.DEFAULT_LOG_LEVEL || 'error',
            }) :
            new winston.transports.Console({
              level: process.env.DEFAULT_LOG_LEVEL || 'warn',
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.ms(),
                nestWinstonModuleUtilities.format.nestLike('NodeAPI', { prettyPrint: true }),
              ),
            }),
          // other transports...
        ],
    }),
    SharedModule, 
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
