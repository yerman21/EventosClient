import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, finalize } from "rxjs/operators";
import { TokenStoreService } from '../_services/token-store.service';
import { LoaderService } from '../_services/loader.service';
import { UsuarioService } from '../_services/usuario.service';

@Injectable()
export class InterceptorPersonal implements HttpInterceptor {
    constructor(
        private usuarioService:UsuarioService,
        private tokenStore: TokenStoreService,
        private loaderService:LoaderService
    ){}
    // modificamos los headers
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("show loader");
        this.loaderService.show();
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
            catchError((error:HttpErrorResponse) => {
                console.log("ejecutando dentro de catchError. ", error);
                if(error.status == 401){
                    this.usuarioService.expirateTimeSession(1);
                }
                return throwError(error);
            }),
            finalize( () => {
                console.log("finalize loader");
                this.loaderService.hide();
            })
        );
    }
}   
