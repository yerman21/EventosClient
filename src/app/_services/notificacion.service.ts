import { Injectable } from '@angular/core';

interface Notificacion{
  msg: string, type:string, visible:boolean
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  notificaciones:Array<Notificacion> = [];
  constructor() { }

  addNotifi(_n:Notificacion){
    this.notificaciones.push(_n);
    setTimeout( () => {
      _n.visible = false;
      setTimeout( () => {
        this.notificaciones.splice(this.notificaciones.indexOf(_n), 1);
      }, 300);
    }, 6000);
  }
  addNotifiDanger(_message:string){
    this.addNotifi({msg:_message, type:"danger", visible:true});
  }
  addNotifiSuccess(_message:string){
    this.addNotifi({msg:_message, type:"success", visible:true});
  }
  addNotifiInfo(_message:string){
    this.addNotifi({msg:_message, type:"info", visible:true});
  }
  addNotifiWarning(_message:string){
    this.addNotifi({msg:_message, type:"warning", visible:true});
  }
}