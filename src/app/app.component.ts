import { Component, OnDestroy } from '@angular/core';
import { UsuarioService } from './_services/usuario.service';
import { NotificacionService } from './_services/notificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{  
  title = 'Eventos App';
  permisos = [] as Array<Object>;
  visibleRouterOutlet:boolean;

  constructor(private userService:UsuarioService, private notiService:NotificacionService){
    // if(!userService.hasToken()){
    //   this.viewBeforeLoggin();
    // }else{
    //   this.vistaUsuarioLogueado();
    // }
  }

  ngOnDestroy(): void {
    console.log("Cerrando session...");
    this.logout();
  }

  // vistaUsuarioLogueado(){
  //   this.visibleRouterOutlet = true;
  //   this.permisos = [
  //     {link:"eventos/0", label:"Eventos"},
  //     {link:"eventos/1", label:"Mis Eventos"},
  //     {link:"perfil", label:"Mi Perfil"}
  //   ]
  // }

  // viewBeforeLoggin(){
  //   this.visibleRouterOutlet = false;
  //   this.permisos = [
  //     {link:"", label:"Login"},
  //     {link:"register", label:"Registrarce"}
  //   ]
  // }

  logout(){
    this.userService.logout().subscribe(
      response => {
        // this.viewBeforeLoggin();
        console.log(response);
      },
      error => {
        console.log("Error al desloguearse")
        this.notiService.addNotifiDanger("Error al desloguearse");
      }
    );
  }
  
}
