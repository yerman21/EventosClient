import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../_services/usuario.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // formLogin:FormGroup;
  formLogin = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  @Output() loginExito = new EventEmitter<Boolean>();

  constructor(private userService:UsuarioService) { }

  ngOnInit() {
  }

  loguearse(){
    if(this.formLogin.invalid) return;
    this.userService.loguearse(this.formLogin.value).subscribe(
      response => { 
        console.log("subscribe de loginComponent", response);
        this.loginExito.emit(true);
      },
      error => {
        console.log("hubo un error : ", error);
      }
    );
  }

}
