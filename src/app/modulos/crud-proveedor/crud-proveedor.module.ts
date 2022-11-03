import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProveedorComponent } from './componentes/create-proveedor/create-proveedor.component';
import { ReadProveedorComponent } from './componentes/read-proveedor/read-proveedor.component';
import { UpdateProveedorComponent } from './componentes/update-proveedor/update-proveedor.component';



@NgModule({
  declarations: [
    CreateProveedorComponent,
    ReadProveedorComponent,
    UpdateProveedorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CrudProveedorModule { }
