import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_services/usuario.service';
import { Router } from '@angular/router';
import { UtilitarioService } from '../_services/utilitario.service';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent implements OnInit {
  permisos = [] as Array<Object>;
  visibleRouterOutlet:boolean;
  isExpirate:boolean;

  constructor(private userService:UsuarioService, private router:Router, private utilitario:UtilitarioService){
    if(!userService.hasToken()){
      this.viewBeforeLoggin();
      console.log("IF userSevice => ", userService.userSession);
      router.navigateByUrl("");      
    }else{
      this.vistaUsuarioLogueado();
      console.log("ELSE userSevice => ", userService.userSession);
      if(!userService.isSetTimeoutSession) userService.expirateTimeSession();
    }
  }

  ngOnInit() {
  }

  vistaUsuarioLogueado(){
    this.visibleRouterOutlet = true;
    this.permisos = [
      {link:"eventos/0", label:"Eventos", outlet: "logueado"},
      {link:"eventos/1", label:"Mis Eventos", outlet: "logueado"},
      {link:"perfil", label:"Mi Perfil", outlet: "logueado"},
    ]
  }

  viewBeforeLoggin(){
    this.visibleRouterOutlet = false;
    this.permisos = [
      {link:"", label:"Login"},
      {link:"register", label:"Registrarce"}
    ]
  }

  logout(){
    this.userService.logout().subscribe(
      response => {
        this.viewBeforeLoggin();
      },
      error => {
        console.log("Error al desloguearse")
      }
    );
  }
}
