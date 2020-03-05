import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TokenStoreService } from './token-store.service';
import { TokenInterface } from '../_interfaces/token-interface';
import { UserInterface } from '../_interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_DOMANIN:string = "http://localhost:8000/";
  private API_SERVER:string = this.API_DOMANIN+"api/";
  private clientID:number = 2;
  private clientSecred:string = "3lDBPTBhk3XnOtnWCzJKaSprznoQmribb2BqXTql";
  userSession:UserInterface;

  constructor(private httpClient :HttpClient, private tokenService: TokenStoreService) { }

  register(data){
    return this.httpClient.post(this.API_SERVER+"user/register", data);
  }

  loguearse(data){
    data.grant_type = "password";
    data.client_id = this.clientID;
    data.client_secret = this.clientSecred;

    return this.httpClient.post(this.API_DOMANIN+"oauth/token", data).pipe(
      tap((rpta:TokenInterface) => {
         this.tokenService.storeTokens(rpta);
         this.getUserData();
      }),
    //   tap((rpta:TokenInterface) => {
    //     console.log("tap2, ", rpta);
    //  }),
      catchError(error => {
        console.log("hubo un error : ", error); 
        return throwError(error);
      })
    );
  }

  getUserData(){
    this.httpClient.get(this.API_SERVER+"user/data").subscribe(
      response => this.userSession = response["data"].user,
      error => console.log("error", error)
    );
  }

  hasToken(){
    if(this.userSession == null) this.getUserData();
    return this.tokenService.hasToken();
  }

  logout(){
    return this.httpClient.get(this.API_SERVER+"user/logout").pipe(
      tap(response => {
          this.tokenService.cleanTokens();
      }),
      catchError(error => {
        console.log("error inesperado", error);
        return throwError(error);
      })
    );
  }

}
