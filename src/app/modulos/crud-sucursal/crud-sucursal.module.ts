import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSucursalComponent } from './componentes/create-sucursal/create-sucursal.component';
import { ReadSucursalComponent } from './componentes/read-sucursal/read-sucursal.component';
import { UpdateSucursalComponent } from './componentes/update-sucursal/update-sucursal.component';



@NgModule({
  declarations: [
    CreateSucursalComponent,
    ReadSucursalComponent,
    UpdateSucursalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CrudSucursalModule { }
