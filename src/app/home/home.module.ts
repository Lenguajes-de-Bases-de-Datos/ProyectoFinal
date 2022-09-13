import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal/portal.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProductosComponent } from './productos/productos.component';



@NgModule({
  declarations: [
    PortalComponent,
    LoginComponent,
    NavbarComponent,
    ProductosComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class HomeModule { }
