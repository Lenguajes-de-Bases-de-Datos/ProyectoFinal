import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from "@angular/common/http";
import {ReactiveFormsModule} from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { TemplatesModule } from './templates/templates.module';
import { CrudUserModule } from './modulos/crud-user/crud-user.module';
import { CrudCategoriaModule } from './modulos/crud-categoria/crud-categoria.module';
import { CrudProveedorModule } from './modulos/crud-proveedor/crud-proveedor.module';
import { CrudSucursalModule } from './modulos/crud-sucursal/crud-sucursal.module';
import { CrudUbicacionModule } from './modulos/crud-ubicacion/crud-ubicacion.module';
import { CrudProductoModule } from'./modulos/crud-producto/crud-producto.module';
import { CrudCompraModule } from './modulos/crud-compra/crud-compra.module';
import { CrudVentaModule } from './modulos/crud-venta/crud-venta.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent

  ],
  imports: [
    BrowserModule,
    
    HomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocketIoModule,
    FormsModule,
    CrudUserModule,
    CrudCategoriaModule,
    CrudProveedorModule,
    CrudSucursalModule,
    CrudUbicacionModule,
    CrudProductoModule,
    CrudCompraModule,
    CrudVentaModule,
    AppRoutingModule

   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
