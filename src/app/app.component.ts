import { Component, OnDestroy, HostListener } from '@angular/core';
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
    // this.automaticCloseSession();
  }

  ngOnDestroy(): void {
    console.log("Cerrando session...");
    // alert("juventud");
    // localStorage.clear();
    // this.logout();
  }

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

  @HostListener("window:onstorage",["$event"])
  automaticCloseSession(event){
    // window.onbeforeunload = (e) => {
    //   window.onunload = () => {
    //     localStorage.isSessionActive = "false"; 
    //       this.userService.cleanTokens();
    //       console.log("Cerrando....");
    //   }
    //   return undefined;
    // };
    //   window.onbeforeunload = function (event) {
    //     var message = '';
    //     if (typeof event == 'undefined') {
    //         event = window.event;
    //     }
    //     if (event) {
    //         event.returnValue = message;
    //     }
    //     // event.preventDefault();
    //     event.stopPropagation();
    //     // return message;
    // };
    // window.onstorage = function(e) {
      console.log("onstorage-> ", event);
      if(event.key != "isConnected") return;
      
      this.probarItem("jorge");
      console.log("entrole");
    // };
  }

  probarItem(item="probando"){
    localStorage.setItem(item, 'dale');
  }
  
}
