import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {HomeResponse} from "../response/HomeResponse";

export function MyHttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    map((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        const body = event.body as HomeResponse;
        if (body) {
          if (! body.success) {
            throw new Error(body.message);
          }
        }
      }
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('请求出错: ', error);
      return throwError(() => error);
    }));
}
