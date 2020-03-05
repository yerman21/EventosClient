import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InterceptorPersonal } from './_interceptor/InterceptorPersonal';
import { HomeComponent } from './home/home.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ListaAsistentesComponent } from './lista-asistentes/lista-asistentes.component';
import { FormEventoComponent } from './form-evento/form-evento.component';
import { FiltroEventoPipe } from './_pipes/filtro-evento.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ListaEventosComponent,
    PerfilComponent,
    ListaAsistentesComponent,
    FormEventoComponent,
    FiltroEventoPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorPersonal,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
