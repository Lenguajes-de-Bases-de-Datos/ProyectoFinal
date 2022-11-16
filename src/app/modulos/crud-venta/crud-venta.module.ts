import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateVentaComponent } from './componentes/create-venta/create-venta.component';
import { ReadVentaComponent } from './componentes/read-venta/read-venta.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateVentaComponent,
    ReadVentaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CrudVentaModule { }
