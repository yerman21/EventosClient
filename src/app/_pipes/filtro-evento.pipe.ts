import { Pipe, PipeTransform } from '@angular/core';
import { EventoInterface } from '../_interfaces/evento-interface';

@Pipe({
  name: 'filtroEvento'
})
export class FiltroEventoPipe implements PipeTransform {

  transform(_items: EventoInterface[], _value2Search:String): any {
    if(_items.length == 0 || !_items) return _items;

    return _items.filter(item => (
              item.titulo.toLowerCase().indexOf(_value2Search.toLowerCase()) > -1
              ||
              item.subtitulo.toLowerCase().indexOf(_value2Search.toLowerCase()) > -1
          ))
  }

}
