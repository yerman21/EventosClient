import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../_services/evento.service';
import { EventoInterface } from '../_interfaces/evento-interface';
import { NotificacionService } from '../_services/notificacion.service';
import { UsuarioService } from '../_services/usuario.service';
import { UserInterface } from '../_interfaces/user-interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  active = 1;
  userInfo:UserInterface = {} as UserInterface;
  listaEventosDUsuario:Array<EventoInterface> = [] as EventoInterface[];
  listaEventosQAsistio:Array<EventoInterface> = [] as EventoInterface[];
  constructor(
    private activeRoute:ActivatedRoute,
    private eventoService:EventoService,
    private notiService:NotificacionService,
    private usuarioService:UsuarioService
  ) { 
    let idd = activeRoute.snapshot.paramMap.get("id") || 0;
    idd = (idd == 0) ? usuarioService.userSession.id : +idd;
    this.getInformacion(idd);

    let listas = ["listaEventosQAsistio", "listaEventosDUsuario"];

    for(let i in [0, 1]){
      eventoService.getEventos(+i, idd).subscribe(
        (response) => {
          this[listas[i]] = response["data"].eventos;
          notiService.addNotifiInfo(response["message"]);
        },
        (error) => notiService.addNotifiDanger(error.error["errorGeneral"])
      );
    }
    console.log("Idd de perfilComponent: "+idd);
  }

  ngOnInit() {    
  }

  ngOnDestroy(){
    console.log("Destruyendo componente");
  }

  getInformacion(idd){
    this.usuarioService.getInformacionOfUser(idd).subscribe(
      response => {
        this.userInfo = response["data"].user;
        this.notiService.addNotifiInfo(response["message"]);
      },
      error => this.notiService.addNotifiDanger(error.error["errorGeneral"])
    );
  }
  getLabelGenero(g:string){
    return g.toLowerCase() == "m" ? "Masculino" : "Femenino";
  }

}
