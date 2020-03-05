import { Injectable } from '@angular/core';
import { TokenInterface } from '../_interfaces/token-interface';

@Injectable({
  providedIn: 'root'
})
export class TokenStoreService {
  constructor() { }

  hasToken(){
    let object_token:TokenInterface = JSON.parse(localStorage.getItem("token"));
    if(object_token != null){
      return object_token.access_token != "";
    }
    return false;
  }

  getObjectToken():TokenInterface{
    return JSON.parse(localStorage.getItem("token"));
  }
  
  storeTokens(object_token:TokenInterface){
    object_token.token_full = object_token.token_type+" "+object_token.access_token;
    localStorage.setItem("token", JSON.stringify(object_token));
  }

  cleanTokens(){
    localStorage.removeItem("token");
    localStorage.clear();
  }
}
