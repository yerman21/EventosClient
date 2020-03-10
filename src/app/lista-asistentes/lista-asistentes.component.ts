import { Component, OnInit, Input } from '@angular/core';
import { AsistenteInterface } from '../_interfaces/asistente-interface';
import { UsuarioService } from '../_services/usuario.service';
import { AsistenciaEventoService } from '../_services/asistencia-evento.service';
import { NotificacionService } from '../_services/notificacion.service';

@Component({
  selector: 'app-lista-asistentes',
  templateUrl: './lista-asistentes.component.html',
  styleUrls: ['./lista-asistentes.component.css']
})
export class ListaAsistentesComponent implements OnInit {
  @Input() lista_asistentes:AsistenteInterface[] = [] as AsistenteInterface[];

  constructor(
    private userService:UsuarioService,
    private asisEventoService:AsistenciaEventoService,
    private notiService:NotificacionService
  ) { }

  ngOnInit() {
  }

  isEventOfUser(){
    console.log(this.userService.userSession);
    return this.userService.userSession.id == this.lista_asistentes[0]["evento"].users_id;
  }

  isUser(_id){
    console.log(this.userService.userSession);
    return this.userService.userSession.id == _id;
  }

  checkControlAnfitrion(_checkedBand, _asistente:AsistenteInterface){
    if(_checkedBand){
      this.asisEventoService.pasarLista(_asistente.evento_id, _asistente.users_id).subscribe(
        response => this.notiService.addNotifiInfo(response["message"]),
        error => this.notiService.addNotifiDanger(error.error["errorGeneral"])
      );
    }else{
      this.asisEventoService.quitarCheckControl(_asistente.evento_id, _asistente.users_id).subscribe(
        response => this.notiService.addNotifiInfo(response["message"]),
        error => this.notiService.addNotifiDanger(error.error["errorGeneral"])
      );
    }
  }

  estadoAsistente(code){
    switch (code) {
      case 1:
        return "Por Asistir";
      break;
      case 2:
        return "Asistio";
      break;
      default:
      case 0:
        return "Falto";
      break;
    }
  }

  // confirmAsistencia(_asistente){
  //   this.asisEventoService.confirmarAsistencia(_asistente.evento_id).subscribe(
  //     response => console.log(response),
  //     error => console.log(error)
  //   );
  // }

}
