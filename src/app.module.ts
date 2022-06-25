import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from "./shared/shared.module"
import { WinstonModule } from "nest-winston"

@Module({
  imports: [
    WinstonModule.forRootAsync({}),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
