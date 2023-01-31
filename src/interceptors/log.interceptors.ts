import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptors implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();

        console.log(`URL: ${request.url}`);
        console.log(`Method: ${request.method}`);
        console.log(`Levou ${Date.now() - dt} milesegundos`);
      }),
    );
  }
}
