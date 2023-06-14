import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './home/default/default.component';
import { PaginainicioComponent } from './home/paginainicio/paginainicio.component';
import { LoginComponent } from './home/login/login.component';
import { PortalComponent } from './home/portal/portal.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RequestsService } from './services/requests.service';
import { CreateUserComponent } from './modulos/crud-user/componentes/crud-users/create-user/create-user.component';
import { ReadUserComponent } from './modulos/crud-user/componentes/crud-users/read-user/read-user.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { UpdateUserComponent } from './modulos/crud-user/componentes/crud-users/update-user/update-user.component';
import { DeleteUserComponent } from './modulos/crud-user/componentes/crud-users/delete-user/delete-user.component';
import { CreateCategoriaComponent } from './modulos/crud-categoria/componentes/crud-categoria/create-categoria/create-categoria.component';
import { ReadCategoriaComponent } from './modulos/crud-categoria/componentes/crud-categoria/read-categoria/read-categoria.component';
import { UpdateCategoriaComponent } from './modulos/crud-categoria/componentes/crud-categoria/update-categoria/update-categoria.component';
import { HomeModule } from './home/home.module';
import { CardCategoriaComponent } from './modulos/crud-categoria/componentes/crud-categoria/card-categoria/card-categoria.component';
import { CreateSucursalComponent } from './modulos/crud-sucursal/componentes/create-sucursal/create-sucursal.component';
import { ReadSucursalComponent } from './modulos/crud-sucursal/componentes/read-sucursal/read-sucursal.component';
import { ReadProductoComponent } from './modulos/crud-producto/componentes/read-producto/read-producto.component';
import { CreateProductoComponent } from './modulos/crud-producto/componentes/create-producto/create-producto.component';
import { CreateCompraComponent } from './modulos/crud-compra/componentes/create-compra/create-compra.component';
import { MoreUserComponent } from './modulos/crud-user/componentes/crud-users/more-user/more-user.component';
import { CreateUbicacionComponent } from './modulos/crud-ubicacion/componentes/create-ubicacion/create-ubicacion.component';
import { UpdateUbicacionComponent } from './modulos/crud-ubicacion/componentes/update-ubicacion/update-ubicacion.component';
import { ReadUbicacionComponent } from './modulos/crud-ubicacion/componentes/read-ubicacion/read-ubicacion.component';
import { CreateProveedorComponent } from './modulos/crud-proveedor/componentes/create-proveedor/create-proveedor.component';
import { ReadProveedorComponent } from './modulos/crud-proveedor/componentes/read-proveedor/read-proveedor.component';
import { UpdateProveedorComponent } from './modulos/crud-proveedor/componentes/update-proveedor/update-proveedor.component';
import { ReadCompraComponent } from './modulos/crud-compra/componentes/read-compra/read-compra.component';
import { OneCompraComponent } from './modulos/crud-compra/componentes/one-compra/one-compra.component';
import { CreateVentaComponent } from './modulos/crud-venta/componentes/create-venta/create-venta.component';
import { ReadVentaComponent } from './modulos/crud-venta/componentes/read-venta/read-venta.component';
import { OneVentaComponent } from './modulos/crud-venta/componentes/one-venta/one-venta.component';

import { OneProductoComponent } from './modulos/crud-producto/componentes/one-producto/one-producto.component';
import { OpenCajaComponent } from './modulos/crud-producto/componentes/open-caja/open-caja.component';
import { CheckExistenciasComponent } from './modulos/crud-producto/componentes/check-existencias/check-existencias.component';
import { UserCompraComponent } from './modulos/crud-compra/componentes/user-compra/user-compra.component';
import { UserVentaComponent } from './modulos/crud-venta/componentes/user-venta/user-venta.component';
import { UpdateProductoComponent } from './modulos/crud-producto/componentes/update-producto/update-producto.component';
import { GraficaGeneroComponent } from './modulos/crud-user/componentes/grafica-genero/grafica-genero.component';
import { GraficaVentasComponent } from './modulos/crud-venta/componentes/grafica-ventas/grafica-ventas.component';
import { MasVendidoComponent } from './modulos/crud-producto/componentes/mas-vendido/mas-vendido.component';
import { MoreProveedorComponent } from './modulos/crud-proveedor/componentes/more-proveedor/more-proveedor.component';
import { GestViewComponent } from './modulos/gest-view/gest-view.component';

const routes: Routes = [
  {path:'portal', component:PortalComponent},
  {path:'sign-up',component:CreateUserComponent,canActivate:[AuthGuardService],data:['administrador']},
  {path:'read-users', component:ReadUserComponent,canActivate:[AuthGuardService]},
  {path:'update-user/:id', component:UpdateUserComponent,canActivate:[AuthGuardService]},
  {path:'delete-user', component:DeleteUserComponent,canActivate:[AuthGuardService]},
  {path:'send-msg',component:SendMessageComponent,canActivate:[AuthGuardService]},
  {path:'create-categoria',component:CreateCategoriaComponent,canActivate:[AuthGuardService]},
  {path:'read-categoria',component:ReadCategoriaComponent,canActivate:[AuthGuardService]},
  {path:'card-categoria/:id',component:CardCategoriaComponent,canActivate:[AuthGuardService]},
  {path:'update-categoria/:id',component:UpdateCategoriaComponent,canActivate:[AuthGuardService]},
  {path:'update-categoria',component:UpdateCategoriaComponent,canActivate:[AuthGuardService]},
  {path:'create-sucursal',component:CreateSucursalComponent,canActivate:[AuthGuardService]},
  {path:'create-sucursal/:id',component:CreateSucursalComponent,canActivate:[AuthGuardService]},
  {path:'read-sucursal',component:ReadSucursalComponent,canActivate:[AuthGuardService]},
  {path:'create-producto',component:CreateProductoComponent,canActivate:[AuthGuardService]},
  {path:'read-producto',component:ReadProductoComponent,canActivate:[AuthGuardService]},
  {path:'update-producto/:id',component:UpdateProductoComponent,canActivate:[AuthGuardService]},
  {path:'one-producto/:nombre',component:OneProductoComponent,canActivate:[AuthGuardService]},
  {path:'open-caja',component:OpenCajaComponent,canActivate:[AuthGuardService]},
  {path:'check-existencias/:id',component:CheckExistenciasComponent,canActivate:[AuthGuardService]},
  {path:'mas-vendido',component:MasVendidoComponent,canActivate:[AuthGuardService]},
  {path:'create-compra',component:CreateCompraComponent,canActivate:[AuthGuardService]},
  {path:'create-proveedor', component:CreateProveedorComponent,canActivate:[AuthGuardService]},
  {path:'read-proveedor',component:ReadProveedorComponent,canActivate:[AuthGuardService]},
  {path:'update-proveedor/:id',component:UpdateProveedorComponent,canActivate:[AuthGuardService]},
  {path:'more-proveedor/:id', component:MoreProveedorComponent,canActivate:[AuthGuardService]},
  {path:'more-user/:ID',component:MoreUserComponent,canActivate:[AuthGuardService]},
  {path:'create-ubicacion',component:CreateUbicacionComponent,canActivate:[AuthGuardService]},
  {path:'read-ubicacion',component:ReadUbicacionComponent,canActivate:[AuthGuardService]},
  {path:'update-ubicacion',component:UpdateUbicacionComponent,canActivate:[AuthGuardService]},
  {path:'update-ubicacion/:id',component:UpdateUbicacionComponent,canActivate:[AuthGuardService]},
  {path: 'paginainicio',component:PaginainicioComponent},
  {path:'default',component:DefaultComponent,canActivate:[AuthGuardService]},
  {path:'read-compra',component:ReadCompraComponent,canActivate:[AuthGuardService]},
  {path:'one-compra/:id',component:OneCompraComponent,canActivate:[AuthGuardService]},
  {path:'user-compra',component:UserCompraComponent,canActivate:[AuthGuardService]},
  {path:'create-venta',component:CreateVentaComponent,canActivate:[AuthGuardService]},
  {path:'read-venta',component:ReadVentaComponent,canActivate:[AuthGuardService]},
  {path:'one-venta/:id',component:OneVentaComponent,canActivate:[AuthGuardService]},
  {path:'grafica-genero',component:GraficaGeneroComponent,canActivate:[AuthGuardService]},
  {path:'grafica-ventas',component:GraficaVentasComponent,canActivate:[AuthGuardService]},
  {path:'user-venta',component:UserVentaComponent,canActivate:[AuthGuardService]},
  {path:'gest-view', component:GestViewComponent},
  {path:'**',component:PortalComponent,canActivate:[AuthGuardService]},
  
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes),ReactiveFormsModule,FormsModule],
  exports: [RouterModule,ReactiveFormsModule],
  providers:[RequestsService,AuthGuardService]

})
export class AppRoutingModule { }
