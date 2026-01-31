import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ApiLogService } from "./api-log.service";

@Injectable()
export class ApiLogInterceptor implements NestInterceptor {
    constructor(private readonly apiLogService: ApiLogService){}

    intercept(context: ExecutionContext, next:  CallHandler): Observable<any>{
        const startedAt = Date.now();
        const http = context.switchToHttp();
        const req = http.getRequest<Request & { originalUrl?: string }>();
        const res = http.getResponse<{ statusCode: number }>();

        return next.handle().pipe(
            tap(async (data) =>{
                const durationMs = Date.now() - startedAt;

                const message = data && typeof data === 'object' && 'message' in (data as any)
                    ? String((data as any).message) : 'OK';

                await this.apiLogService.write({
                    ts: new Date(),
                    method: (req as any).method,
                    path: req.originalUrl ?? (req as any).url,
                    status: res.statusCode,
                    message,
                    durationMs,
                } as any);
            }),
        );
    }
}