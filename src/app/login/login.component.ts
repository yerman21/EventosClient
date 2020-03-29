import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../_services/usuario.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacionService } from '../_services/notificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({
    // username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  @Output() loginExito = new EventEmitter<Boolean>();

  constructor(
    private userService:UsuarioService,
    private router:Router,
    private notiService:NotificacionService
  ) { }

  ngOnInit() {
  }

  loguearse(){
    if(this.formLogin.invalid) return;
    this.userService.loguearse(this.formLogin.value).subscribe(
      response => {
        console.log("subscribe de loginComponent", response);
        // this.notiService.addNotifiInfo(response["message"]),
        // this.loginExito.emit(true);
        this.router.navigate(["/app", {outlets: {logueado: ""}}]);
      },
      error => {
        // this.notiService.addNotifiDanger(error["message"])
      }
    );
  }
}
