import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../../auth.service';



@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    constructor(private readonly auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = localStorage.getItem('access_token');
        if (authToken) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + authToken)
              });
            return next.handle(authReq);
        }
        return next.handle(req);
      }

}
