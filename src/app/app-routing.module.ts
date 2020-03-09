import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';
import { EventoComponent } from './evento/evento.component';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';


const routes: Routes = [    
  {path:"login", component: LoginComponent},
  {path:"app", component: UserNavigationComponent,
    children: [
      {path:"", component: EventoComponent, data:{ bandMisEventos:0 }, outlet:"logueado"},
      {path:"register", component: RegisterComponent, outlet:"logueado"},
      {path:"eventos/0", component: EventoComponent, data:{ bandMisEventos:0 }, outlet:"logueado"},
      {path:"eventos/1", component: EventoComponent, data:{ bandMisEventos:1 }, outlet:"logueado"},
      {path:"perfil/:id", component: PerfilComponent, outlet:"logueado"},
      {path:"perfil", component: PerfilComponent, outlet:"logueado"},
    ]
  },
  {path:"**", redirectTo: "app"},
  // {path:"**", redirectTo: "", outlet:"logueado"},
];
// dinamic view - multiple router-outler
// https://netbasal.com/implementing-dynamic-views-in-angular-20ae7c62fec3

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
