import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"register", component: RegisterComponent},
  {path:"eventos/0", component: HomeComponent, data:{ bandMisEventos:0 }},
  {path:"eventos/1", component: HomeComponent, data:{ bandMisEventos:1 }},
  {path:"perfil/:id", component: PerfilComponent},
  {path:"perfil", component: PerfilComponent},
  {path:"**", redirectTo: ""},
];
// dinamic view - multiple router-outler
// https://netbasal.com/implementing-dynamic-views-in-angular-20ae7c62fec3

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
