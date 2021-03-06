import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {serviceCounts} from './globals';
import {finalize} from 'rxjs/operators';

export class TokenInterceptor implements HttpInterceptor {
  serviceCounts = serviceCounts;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.serviceCounts++;
    const modified = req.clone({
      setHeaders: {Authorization: 'Bearer ey' }
    });
    console.log(req);
    document.getElementById('loading').style.display = 'block';
    return next.handle(modified).pipe(
      finalize(() => {
        this.serviceCounts--;
        if (this.serviceCounts === 0) {
          document.getElementById('loading').style.display = 'none';
        }
      }));
  }
}
