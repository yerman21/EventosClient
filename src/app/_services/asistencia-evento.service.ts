import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaEventoService {
  private API_SERVER:string = "http://localhost:8000/api/asistencia_evento/";

  constructor(private httpClient:HttpClient) { }

  who_asistent_to_event(idd){
    return this.httpClient.get(this.API_SERVER+`${idd}/asistentes`);
  }

  apuntarse(id){
    return this.httpClient.post(this.API_SERVER, {evento_id : id});
  }

  desapuntarse(id){
    return this.httpClient.delete(this.API_SERVER+id);
  }

  pasarLista(evento_id, usuario_id){
    return this.httpClient.put(this.API_SERVER+"pasar_asistencia", {evento_id, usuario_id});
  }

  confirmarAsistencia(evento_id){
    return this.httpClient.put(this.API_SERVER+`confirmar_asistencia/${evento_id}`, {});
  }

}
