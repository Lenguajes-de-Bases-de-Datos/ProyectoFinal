import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompraComponent } from './componentes/create-compra/create-compra.component';
import { ReadCompraComponent } from './componentes/read-compra/read-compra.component';
import { CrudProductoModule } from '../crud-producto/crud-producto.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from 'src/app/home/home.module';
import { OneCompraComponent } from './componentes/one-compra/one-compra.component';
import { UserCompraComponent } from './componentes/user-compra/user-compra.component';



@NgModule({
  declarations: [
    CreateCompraComponent,
    ReadCompraComponent,
    OneCompraComponent,
    UserCompraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeModule,
    ReactiveFormsModule,
    CrudProductoModule
  ]
})
export class CrudCompraModule { }
