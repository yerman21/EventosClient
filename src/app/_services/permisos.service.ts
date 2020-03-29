import { Injectable, Type } from '@angular/core';
import { ComponentesColeccion } from '../_interfaces/componentes_coleccion';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  static gestionarPermisos(routes: import("@angular/router").Routes) {  
    let lista = [];
    for(let obj in ComponentesColeccion){
      lista.push(obj);
    }
    console.log("Cargando.. permisos");
    routes.push(
      {
        path:"app",
        component: ComponentesColeccion["UserNavigationComponent"],
        children: [
          {path:"", component: ComponentesColeccion["EventoComponent"], data:{ bandMisEventos:0 }, outlet:"logueado"},
          {path:"register", component: ComponentesColeccion["RegisterComponent"], outlet:"logueado"},
          {path:"eventos/0", component: ComponentesColeccion["EventoComponent"], data:{ bandMisEventos:0 }, outlet:"logueado"},
          {path:"eventos/1", component: ComponentesColeccion["EventoComponent"], data:{ bandMisEventos:1 }, outlet:"logueado"},
          {path:"perfil/:id", component: ComponentesColeccion["PerfilComponent"], outlet:"logueado"},
          {path:"perfil", component: ComponentesColeccion["PerfilComponent"], outlet:"logueado"},
        ]
      },
    )
  }

  constructor() { }
}
