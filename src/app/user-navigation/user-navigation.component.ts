import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent implements OnInit {
  permisos = [] as Array<Object>;
  visibleRouterOutlet:boolean;

  constructor(private userService:UsuarioService, private router:Router){
    if(!userService.hasToken()){
      this.viewBeforeLoggin();
      router.navigateByUrl("");
    }else{
      this.vistaUsuarioLogueado();
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

  preLink(_list){
    if(!_list || _list.length == 0) return {};
    let objectResult = {};
    _list.forEach(element => {
      objectResult[element.i] = element.v
    });
    console.log(objectResult);
    return objectResult;
    
  }
  

}
