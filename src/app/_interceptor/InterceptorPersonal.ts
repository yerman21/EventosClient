import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { TokenStoreService } from '../_services/token-store.service';

@Injectable()
export class InterceptorPersonal implements HttpInterceptor {
    constructor(private tokenStore: TokenStoreService){}
    // modificamos los headers
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //interceptando solicitud
        let modificarRequest;
        if(this.tokenStore.hasToken()){
            modificarRequest = req.clone({
                headers: req.headers.set("Authorization", this.tokenStore.getObjectToken().token_full)
                // new HttpHeaders({
                //     "Authorization": this.tokenStore.TOKEN_FULL,
                // })
            });
        }else{ modificarRequest = req; }

        return next.handle(modificarRequest).pipe(
            //pipe de RxJS sirve para combinar funciones en una sola. Y todas ella se ejecutan en orden.
            //interceptando respuesta
            tap(response => {
                //    console.log("ejecutando dentro de tap");
                    // if(response instanceof HttpResponse)
                    //     console.log("api call success :", response); 
            }),
            catchError(response => {
                console.log("ejecutando dentro de catchError");                
                console.log("api call error :", response);

                return throwError(response);
            })
        );
    }
    
}   
