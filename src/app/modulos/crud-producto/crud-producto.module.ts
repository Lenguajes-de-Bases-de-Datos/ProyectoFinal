import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadProductoComponent } from './componentes/read-producto/read-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from 'src/app/home/home.module';
import { CreateProductoComponent } from './componentes/create-producto/create-producto.component';
import { OneProductoComponent } from './componentes/one-producto/one-producto.component';



@NgModule({
  declarations: [
    ReadProductoComponent,
    CreateProductoComponent,
    OneProductoComponent
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
