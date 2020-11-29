import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent,
  HttpInterceptor, HttpEventType,
  HttpResponse, HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {

  private readonly requestStartTimeKey = 'requestStartTime';

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('product')) {
      return next.handle(request);
    }

    return next.handle(request.clone(this.setRequestStartTime()))
      .pipe(
        filter((event: HttpEvent<unknown>) => event.type === HttpEventType.Response),
        tap((event: HttpResponse<unknown>) => {
          const url = event.url;
          const requestStartTime = this.extractRequestStartTime(new URL(url));
          console.log(`${event.url}: ${Date.now() - requestStartTime}ms`);
        })
      );
  }

  private setRequestStartTime(): object {
    const now = Date.now();
    const params = new HttpParams().set(this.requestStartTimeKey, now.toString());
    return { params };
  }

  private extractRequestStartTime(url: URL): number {
    return +url.searchParams.get(this.requestStartTimeKey);
  }
}
