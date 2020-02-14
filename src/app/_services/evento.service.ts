import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { EventoInterface } from '../_interfaces/evento-interface';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private API_SERVER:string = "http://localhost:8000/api/evento/";

  constructor(private httpClient:HttpClient) { }

  getEventos(bandOtros=0){
      return this.httpClient.get(this.API_SERVER+bandOtros).pipe(
        tap(r => {
          let base = r["data"].basePathImage;
          let eventos = r["data"]["eventos"];
          eventos = eventos.map(item => { item.foto = base+item.foto; return item;});
          return r;
        })
      );
  }
//  para upload  file https://stackoverflow.com/questions/47936183/angular-file-upload
  save(evento:EventoInterface, fileToUpload){
    const formData: FormData = new FormData();
    for(let clave in evento){
      formData.set(clave, evento[clave]);
      console.log(`${clave} - ${evento[clave]}`);
    }
    let fileName = fileToUpload.name;
    console.log(fileName);
    fileName = fileToUpload.name.substring(fileToUpload.name.lastIndexOf("\\")+1);
    console.log(fileName);
    console.log(fileToUpload.name.substring(fileToUpload.name.lastIndexOf("\\")+1));
    formData.set('foto', fileToUpload, fileName);
    return this.httpClient.post(this.API_SERVER, formData);

    // return this.httpClient.post(this.API_SERVER, evento);
  }

  updated(evento:EventoInterface, idd) {
    return this.httpClient.put(this.API_SERVER+idd, evento);
  }

  eliminar(idd){
    return this.httpClient.delete(this.API_SERVER+idd);
  }

}
