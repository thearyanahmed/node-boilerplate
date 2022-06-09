import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { configModuleOptions } from "./configs/module-options"
import { AppLoggerModule } from "./logger/logger.module"
import { ThrottlerModule } from "@nestjs/throttler"

@Module({
    imports: [
        ConfigModule.forRoot(configModuleOptions),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: "mysql",
                name: configService.get<string>("database.connection_name"),
                host: configService.get<string>("database.host"),
                port: configService.get<number | undefined>("database.port"),
                database: configService.get<string>("database.name"),
                username: configService.get<string>("database.user"),
                password: configService.get<string>("database.pass"),
                entities: [__dirname + "/../modules/**/*.entity{.ts,.js}"],
                migrations: ["../../migrations/"],
                cli: {
                    // entitiesDir: 'src',
                    migrationsDir: __dirname + "../../migrations/",
                },
                // Timezone configured on the MySQL server.
                // This is used to typecast server date/time values to JavaScript Date object and vice versa.
                timezone: "Z",
                synchronize: false,
                debug: false, // configService.get<string>('env') === 'development',
            })
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                ttl: config.get<number>("throttler.ttl"),
                limit: config.get<number>("throttler.limit"),
            }),
        }),
        AppLoggerModule,
    ],
    exports: [AppLoggerModule, ConfigModule],
    providers: [
    ],
})
export class SharedModule {}
