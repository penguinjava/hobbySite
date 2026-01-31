import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongoModule } from '../mongo/mongo.module';
import { ApiLogService } from './api-log.service';
import { ApiLogInterceptor } from './api-log.interceptor';
import { ApiLogExceptionFilter } from './api-log-exception.filter';


@Module({
    imports: [MongoModule],
    providers: [
        ApiLogService,
        { provide: APP_FILTER, useClass: ApiLogExceptionFilter },
        { provide: APP_INTERCEPTOR, useClass: ApiLogInterceptor }
    ],
})
export class LoggingModule {}