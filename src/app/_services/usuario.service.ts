import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TokenStoreService } from './token-store.service';
import { TokenInterface } from '../_interfaces/token-interface';
import { UserInterface } from '../_interfaces/user-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements OnDestroy{
  private API_DOMANIN:string = "http://localhost:8000/";
  private API_SERVER:string = this.API_DOMANIN+"api/";
  private clientID:number = 2;
  private clientSecred:string = "3lDBPTBhk3XnOtnWCzJKaSprznoQmribb2BqXTql";
  userSession:UserInterface;
  isSetTimeoutSession:boolean = false;

  constructor(
    private httpClient:HttpClient,
    private tokenService: TokenStoreService,
    private router:Router
  ) { }
  
  ngOnDestroy(){
    this.tokenService.cleanTokens();
  }

  register(data){
    return this.httpClient.post(this.API_SERVER+"user/register", data);
  }

  loguearse(data){
    data.grant_type = "password";
    data.client_id = this.clientID;
    data.client_secret = this.clientSecred;

    // return this.httpClient.post(this.API_DOMANIN+"oauth/token", data).pipe(
    return this.httpClient.post(this.API_SERVER+"login", data).pipe(
      tap((rpta:TokenInterface) => {
         this.tokenService.storeTokens(rpta["data"].token);
         this.userSession = rpta["data"].userData;

         this.expirateTimeSession();
      }),
      catchError(error => {
        console.log("hubo un error : ", error); 
        return throwError(error);
      })
    );
  }

  refreshToken(){
    let data = {
      grant_type: "refresh_token",
      client_id : this.clientID,
      client_secret : this.clientSecred,
      refresh_token : this.tokenService.getObjectToken().refresh_token
    };

    return this.httpClient.post(this.API_SERVER+"refreshToken", data).pipe(
      tap((rpta:TokenInterface) => {
         this.tokenService.storeTokens(rpta["data"].token);
         this.userSession = rpta["data"].userData;
         this.expirateTimeSession();
      }),
      catchError(error => {
        console.log("hubo un error : ", error);
        return throwError(error);
      })
    );
  }

  getUserData(){
    this.getInformacionOfUser().subscribe(
      response => this.userSession = response["data"].user,
      error => console.log("error", error)
    );
  }

  getInformacionOfUser(idd=""){
    return this.httpClient.get(this.API_SERVER+"user/data"+(idd == "" ? idd : "/"+idd));
  }

  expirateTimeSession(timeDefault=null){
    console.log("tiempo es ", this.tokenService.getObjectToken().expires_in);
    setTimeout(() => {
      var r = confirm("Se termino la session, desea continuar???");
      if(!r){
        this.refreshToken().subscribe(() => this.logout().subscribe() );
      }else{
        this.refreshToken().subscribe();
      }
    }, timeDefault || this.tokenService.getObjectToken().expires_in*1000);
    this.isSetTimeoutSession = true;
  }
  
  hasToken(){
    if(this.userSession == null) this.getUserData();
    return this.tokenService.hasToken();
  }
  
  cleanTokens(){
    this.tokenService.cleanTokens();
  }

  logout(){
    return this.httpClient.get(this.API_SERVER+"user/logout").pipe(
      tap(response => {
          this.tokenService.cleanTokens();
          this.router.navigateByUrl("login");
      }),
      catchError(error => {
        console.log("error inesperado", error);
        return throwError(error);
      })
    );
  }
}