import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();

  show(){
    setTimeout( () => this.isLoading.next(true), 0);
  }
  hide(){
    setTimeout( () => this.isLoading.next(false), 0);
  }
  constructor() { }
}
