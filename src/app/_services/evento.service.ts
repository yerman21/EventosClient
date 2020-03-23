import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, delay } from 'rxjs/operators';
import { EventoInterface } from '../_interfaces/evento-interface';
import { UtilitarioService } from './utilitario.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private API_SERVER:string = "http://localhost:8000/api/evento/";
  public iddEvento:number;

  constructor(
    private httpClient:HttpClient,
    private utilitario:UtilitarioService
  ) { }

  getOneEvento(idd){
    return this.httpClient.get(this.API_SERVER+"edit/"+idd).pipe(
      delay(0),
      tap(r => {
        let evento = r["data"]["evento"];
        evento.fecha_de_asistencia = this.utilitario.conDateUTCtoLocal(evento.fecha_de_asistencia);
        evento.fecha_de_termino = this.utilitario.conDateUTCtoLocal(evento.fecha_de_termino);
        return r;
      })
    );
  }

  getEventos(bandOpcion=0, idUsuario=0){
      return this.httpClient.get(this.API_SERVER+bandOpcion+(!idUsuario?"":"/perfil/"+idUsuario)).pipe(
        tap(r => {
          let base = r["data"].basePathImage;
          let eventos = r["data"]["eventos"];
          eventos = eventos.map(
                      item => {
                        item.foto = base+item.foto;
                        item.fecha_de_asistencia = this.utilitario.conDateUTCtoLocal(item.fecha_de_asistencia);
                        item.fecha_de_termino = this.utilitario.conDateUTCtoLocal(item.fecha_de_termino);
                        return item;
                      }
                    );
          return r;
        })
      );
  }
//  para upload  file https://stackoverflow.com/questions/47936183/angular-file-upload
  save(evento:EventoInterface, fileToUpload){
    let data = this.fillFormData(evento, fileToUpload);
    return this.httpClient.post(this.API_SERVER, data);
  }

  updated(evento:EventoInterface, idd, fileToUpload) {
    this.convertToUTCDate(evento, ["fecha_de_asistencia", "fecha_de_termino"]);
    if(fileToUpload == null){
      var v = Object.assign({}, evento);
      delete v.foto;
    }
    let data = (fileToUpload == null ) ? v : this.fillFormData(evento, fileToUpload);
    return this.httpClient.post(this.API_SERVER+"edit/"+idd, data);
  }

  eliminar(idd){
    return this.httpClient.delete(this.API_SERVER+idd);
  }

  private fillFormData(evento, fileToUpload){
    const formData: FormData = new FormData();
    for(let clave in evento){
      formData.set(clave, evento[clave]);
    }
    // formData.set('foto', (fileToUpload) ? fileToUpload : '');
    formData.set('foto', fileToUpload);
    return formData;
  }

  private convertToUTCDate(data, fields:Array<string>){    
    for(let field of fields){      
      data[field] = this.utilitario.conZoneUTC(data[field]);
    }
  }

}
