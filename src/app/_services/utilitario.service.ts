import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitarioService {

  constructor() { }

  dateToFormatISO(fechaLocalString:string):string{
    let d = new Date(fechaLocalString+" UTC");
    return d.toISOString().slice(0, -1);
  }

  conDateUTCtoLocal(_dateUTC:string){
    return new Date(_dateUTC+" UTC").toString();
  }

  conZoneUTC(fechaLocalString:string):string{
    let d = new Date(fechaLocalString).toUTCString();
    return new Date(d).toISOString().slice(0, -1);
  }
}
