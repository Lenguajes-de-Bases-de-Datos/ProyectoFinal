import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadProductoComponent } from './componentes/read-producto/read-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from 'src/app/home/home.module';
import { CreateProductoComponent } from './componentes/create-producto/create-producto.component';
import { OneProductoComponent } from './componentes/one-producto/one-producto.component';
import { OpenCajaComponent } from './componentes/open-caja/open-caja.component';
import { CheckExistenciasComponent } from './componentes/check-existencias/check-existencias.component';



@NgModule({
  declarations: [
    ReadProductoComponent,
    CreateProductoComponent,
    OneProductoComponent,
    OpenCajaComponent,
    CheckExistenciasComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ReadProductoComponent]
})
export class CrudProductoModule { }
