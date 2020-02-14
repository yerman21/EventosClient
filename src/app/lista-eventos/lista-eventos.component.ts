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
  @Output() onApuntarse = new EventEmitter<number>();
  @Output() onDesapuntarse = new EventEmitter<number>();
  @Output() onVer = new EventEmitter<number>();
  
  constructor() { 
    this.listaEventos = [] as EventoInterface[];
  }

  ngOnInit() {
  }
  
  cambiarAsistencia(idd, band:boolean){
    if(this.listaEventos == []) return;
    let item = this.listaEventos.find(item => item["id"] == idd);
    item["bandApuntado"] = band;
  }

}
