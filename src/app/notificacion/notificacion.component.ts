import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../_services/notificacion.service';

interface Notificacion{
  msg: string, type:string, visible:boolean
}

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  notificaciones:Array<Notificacion> = [];
  constructor(private notiService: NotificacionService) {  
  }

  ngOnInit() {
    this.notificaciones = this.notiService.notificaciones;
  }

  close(_noti: Notificacion) {
    _noti.visible = false;
    setTimeout( () => {
        this.notificaciones.splice(this.notificaciones.indexOf(_noti), 1);
    }, 300);
  }

}
