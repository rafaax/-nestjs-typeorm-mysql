import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const date = Date.now(); // tempo que interceptor foi observado

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();

        console.log(request.method + ' ' + request.url);
        console.log(request.body);

        console.log(`Execução levou ${Date.now() - date} milisegundos..`);
      }),
    );
  }
}
