import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoInterface } from '../_interfaces/evento-interface';
import { EventoService } from '../_services/evento.service';
import { Subscription } from 'rxjs';
import { AsistenciaEventoService } from '../_services/asistencia-evento.service';
import { ListaEventosComponent } from '../lista-eventos/lista-eventos.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AsistenteInterface } from '../_interfaces/asistente-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  listaEventos = [] as EventoInterface[];
  lista_asistentes = [] as AsistenteInterface[];
  @ViewChild(ListaEventosComponent, {static:false}) lista_eventos:ListaEventosComponent;
  bandMisEventos:number;
  bandFormEvento:boolean;
  iddEvento:number;
  sub = new Subscription();

  constructor(
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private eventoService: EventoService,
    private asistenciaEventoService: AsistenciaEventoService
  ) {

  }

  ngOnInit() {
    // let opcion = +this.activeRoute.snapshot.paramMap.get('opcion');
    this.sub = this.activeRoute.data
              .subscribe(
                v => {this.bandMisEventos = v.bandMisEventos; this.listarEventos(this.bandMisEventos);}
              );
  }

   ngOnDestroy() {
    this.sub.unsubscribe();
  }

  listarEventos(opcion:number=0){
    let ob_getEventos = this.eventoService.getEventos(opcion).subscribe(
      response => {
        console.log(response); 
        this.listaEventos = response["data"].eventos;
      },
      error => { console.log(error); }
    );
    this.sub.add(ob_getEventos);
  }

  callApuntarse(idd){
    console.log("callApuntarse : ", idd);
    this.asistenciaEventoService.apuntarse(idd).subscribe(
      response => { this.lista_eventos.cambiarAsistencia(idd, true); },
      error => { console.log("Error callApuntarse(): ", error); }
    );
  }

  callDesapuntarse(idd){
    console.log("callDesapuntarse : ", idd);
    this.asistenciaEventoService.desapuntarse(idd).subscribe(
      response => { this.lista_eventos.cambiarAsistencia(idd, false); },
      error => { console.log("Error callDesapuntarse(): ", error); }
    );
  }

  callVer(idd, contentModel){
    console.log("callVer : ", idd);
    this.asistenciaEventoService.who_asistent_to_event(idd).subscribe(
      response => { 
        console.log("Callver()", response);
        this.lista_asistentes = response["data"].asistententes;
        this.showModalAsistentes(contentModel);
      },
      error => console.log("error callVer()", error)
    );    
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
      (result) => {},
      (reason) => {}
    );
  }
  
}
