import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EventoInterface } from '../_interfaces/evento-interface';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {
  @Input() listaEventos:EventoInterface[];
  @Input() bandEdit:number;
  @Input() inputBandMisEventos:boolean;
  @Output() onApuntarse = new EventEmitter<number>();
  @Output() onDesapuntarse = new EventEmitter<number>();
  @Output() onVer = new EventEmitter<number>();
  @Output() onEditar = new EventEmitter<number>();
  @Output() onConfirmarAsis = new EventEmitter<number>();
  busqueda:string = "";
  
  constructor() { 
    this.listaEventos = [] as EventoInterface[];
  }

  ngOnInit() {
    console.log(`bandEdit=${this.bandEdit}, inputBandMisEventos=${this.inputBandMisEventos}`);
  }
  
  cambiarEstado(_atributo:string, _idd, _band:boolean){
    if(this.listaEventos == []) return;
    let item = this.listaEventos.find(item => item["id"] == _idd);
    item[_atributo] = _band;
  }

  didEventStart(_evento){
    return new Date(_evento.fecha_de_asistencia).getTime() < new Date().getTime();
  }

  isEventOfUser(){

  }

  callOnConfirmarAsis(_bandCheck, _evento){
    if(_evento.bandCheckInvitado) return;
    if(!_bandCheck) return;

    this.onConfirmarAsis.emit(_evento.id);
  }

}
