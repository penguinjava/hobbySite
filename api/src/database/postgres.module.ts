import { Module } from '@nestjs/common';
import {TypeOrmModule}  from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST'),
                port: parseInt(config.get<string>('DB_PORT') as string),
                username: config.get<string>('DB_USER')!,
                password: config.get<string>('DB_PASSWORD')!,
                database: config.get<string>('DB_DATABASE')!,
                synchronize: false,
                autoLoadEntities: true
            }),
        }),
    ],
})
export class PostgresModule {}
