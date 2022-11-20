import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateVentaComponent } from './componentes/create-venta/create-venta.component';
import { ReadVentaComponent } from './componentes/read-venta/read-venta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from 'src/app/home/home.module';
import { OneVentaComponent } from './componentes/one-venta/one-venta.component';



@NgModule({
  declarations: [
    CreateVentaComponent,
    ReadVentaComponent,
    OneVentaComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CrudVentaModule { }
