import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoInterface } from '../_interfaces/evento-interface';
import { EventoService } from '../_services/evento.service';
import { Subscription } from 'rxjs';
import { AsistenciaEventoService } from '../_services/asistencia-evento.service';
import { ListaEventosComponent } from '../lista-eventos/lista-eventos.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AsistenteInterface } from '../_interfaces/asistente-interface';
import { NotificacionService } from '../_services/notificacion.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit{
  listaEventos = [] as EventoInterface[];
  lista_asistentes = [] as AsistenteInterface[];
  bandMisEventos:number;
  bandFormEvento:boolean;
  iddEvento:number;
  sub = new Subscription();
  @ViewChild(ListaEventosComponent, {static:false}) lista_eventos:ListaEventosComponent;

  constructor(
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private eventoService: EventoService,
    private asistenciaEventoService: AsistenciaEventoService,
    private notiService: NotificacionService
  ) {

  }

  ngOnInit() {
    this.sub = this.activeRoute.data
              .subscribe(
                v => {this.bandMisEventos = v.bandMisEventos; this.listarEventos();}
              );
  }

   ngOnDestroy() {
    this.sub.unsubscribe();
  }

  listarEventos(){
    let opcion = this.bandMisEventos || 0;
    let ob_getEventos = this.eventoService.getEventos(opcion).subscribe(
      response => {
        this.listaEventos = response["data"].eventos;
        this.notiService.addNotifiInfo(response["message"]);
      },
      error => { this.notiService.addNotifiDanger(error.error["errorGeneral"]); }
    );
    this.sub.add(ob_getEventos);
  }

  callApuntarse(idd){
    this.asistenciaEventoService.apuntarse(idd).subscribe(
      response => { this.lista_eventos.cambiarEstado("bandApuntado", idd, true); },
      error => { this.notiService.addNotifiDanger(error.error["errorGeneral"]); }
    );
  }

  callDesapuntarse(idd){
    this.asistenciaEventoService.desapuntarse(idd).subscribe(
      response => { this.lista_eventos.cambiarEstado("bandApuntado", idd, false); },
      error => { this.notiService.addNotifiDanger(error.error["errorGeneral"]); }
    );
  }

  callVer(_idd, _contentModel){
    this.asistenciaEventoService.who_asistent_to_event(_idd).subscribe(
      response => { 
        this.lista_asistentes = response["data"].asistententes;
        this.showModalAsistentes(_contentModel);
      },
      error => this.notiService.addNotifiDanger(error.error["errorGeneral"])
    );    
  }

  callFormEditar(idd, content){
    this.bandFormEvento = true;
    this.eventoService.iddEvento = idd;
    // this.iddEvento = idd;
    this.showFormEvento(content)
  }

  showModalAsistentes(content) {
    this.bandFormEvento = false;
    this.modalService.open(content, { size: 'lg' }).result.then(
    (result) => {  },
    (reason) => {
      console.log("reason: ", reason);
      this.lista_asistentes = [] as AsistenteInterface[];
    });
  }

  showFormEvento(content){
    this.bandFormEvento = true;
    this.modalService.open(content, {size: 'lg'}).result.then(
      (result) => { this.eventoService.iddEvento = null; },
      (reason) => { this.eventoService.iddEvento = null; }
    );
  }

  callConfirmarAsis(_asistente){
    this.asistenciaEventoService.confirmarAsistencia(_asistente).subscribe(
      response => this.lista_eventos.cambiarEstado("bandCheckInvitado", _asistente, true),
      error => this.notiService.addNotifiDanger(error.error["errorGeneral"])
    );
  }
}
