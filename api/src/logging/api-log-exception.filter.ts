import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { ApiLogService } from './api-log.service';

@Catch()
export class ApiLogExceptionFilter implements ExceptionFilter {
    constructor(private readonly apiLogService: ApiLogService){}

    async catch(exception: unknown, host: ArgumentsHost){
        const http = host.switchToHttp();
        const req = http.getRequest<Request & { originalUrl?: string }>();
        const res = http.getResponse<any>();

        const isHttpException = exception instanceof HttpException;
        const statusCode = isHttpException ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        let message = 'ERROR';

        if (isHttpException){
            const responseBody = exception.getResponse() as any;

            if (typeof responseBody === 'string'){
                message = responseBody;
            } else if (responseBody?.message){
                message = Array.isArray(responseBody.message)
                    ? responseBody.message.join(',') : String(responseBody.message);
            } else{
                message = exception.message;
            }
        }

        const durationMs = 0;

        await this.apiLogService.write({
            ts: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', hour12: false }),
            method: (req as any).method,
            path: req.originalUrl ?? (req as any).url,
            status: statusCode,
            message,
            durationMs,
        });

        if (isHttpException){
            return res.status(statusCode).json(exception.getResponse());
        }

        return res.status(statusCode).json({
            statusCode,
            message: 'Internal server error',
        });
    }
}