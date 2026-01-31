import { Inject, Injectable } from '@nestjs/common'
import { MongoClient } from 'mongodb';
import { ConfigService } from '@nestjs/config';

export type ApiLogDoc = {
    ts: string;
    method: string;
    path: string;
    status: number;
    message?: string;
    durationMs?: number;
};

@Injectable()
export class ApiLogService{
    constructor(
        @Inject('MONGO_CLIENT') private readonly mongoClient: MongoClient,
        private readonly configService: ConfigService,){}

    async write(doc: ApiLogDoc): Promise<void>{
        try{
            const dbName = this.configService.get<string>('MONGO_DB');
            const collectionName = this.configService.get<string>('MONGO_LOG_COLLECTION');

            await this.mongoClient
                .db(dbName)
                .collection(collectionName as string)
                .insertOne(doc);
        } catch{}
    }
}