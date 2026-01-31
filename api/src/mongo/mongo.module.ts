import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MongoClient } from 'mongodb';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'MONGO_CLIENT',
            inject:  [ConfigService],
            useFactory: async (config: ConfigService)=>{
                const host = config.get<string>('DB_HOST');
                const port = parseInt(config.get<string>('MONGO_PORT') as string);
                const dbName = config.get<string>('MONGO_DB');
                const user = config.get<string>('MONGO_USER');
                const pass = config.get<string>('MONGO_PASS');
                const authSource = config.get<string>('MONGO_AUTH_SOURCE');

                const client = new MongoClient(`mongodb://${host}:${port}`,{
                    maxPoolSize: 10,
                    directConnection: true,
                    auth: user && pass ?  { username: user, password: pass} : undefined,
                    authSource:  user && pass ? authSource : undefined,
                });

                await client.connect();
                await client.db(dbName).command({ ping: 1});

                return client;
            },
        },
    ],
    exports: ['MONGO_CLIENT'],
})
export class MongoModule {}