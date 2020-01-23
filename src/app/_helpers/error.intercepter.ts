import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication-service.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(request).pipe(
            tap(response => {
                if(response["body"] && !response["body"].success && response["body"].message == 'Invalid Token'){
                    this.authenticationService.logout();
                    location.reload(true);
                }else if(response["body"] && !response["body"].success){
                    const error = response["body"].message;
                    return throwError(error);
                }
                
            }),
            catchError(err => {
                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        )
    }
}