import { Component, OnInit, Input } from '@angular/core';
import { AsistenteInterface } from '../_interfaces/asistente-interface';

@Component({
  selector: 'app-lista-asistentes',
  templateUrl: './lista-asistentes.component.html',
  styleUrls: ['./lista-asistentes.component.css']
})
export class ListaAsistentesComponent implements OnInit {
  @Input() lista_asistentes:AsistenteInterface[] = [] as AsistenteInterface[];

  constructor() { }

  ngOnInit() {
  }

}
