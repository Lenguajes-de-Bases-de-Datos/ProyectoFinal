import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompraComponent } from './componentes/create-compra/create-compra.component';
import { ReadCompraComponent } from './componentes/read-compra/read-compra.component';
import { CrudProductoModule } from '../crud-producto/crud-producto.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateCompraComponent,
    ReadCompraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CrudProductoModule
  ]
})
export class CrudCompraModule { }
