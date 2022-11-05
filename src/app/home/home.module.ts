import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal/portal.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultComponent } from './default/default.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { OptionsComponent } from './options/options.component';

@NgModule({
  declarations: [
    PortalComponent,
    LoginComponent,
    NavbarComponent,
    ProductosComponent,
    DefaultComponent,
    PaginacionComponent,
    OptionsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    NavbarComponent,
    LoginComponent,
    PortalComponent,
    PaginacionComponent,
    OptionsComponent
  ]
})
export class HomeModule { }
