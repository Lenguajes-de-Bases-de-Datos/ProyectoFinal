import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProveedorComponent } from './create-proveedor/create-proveedor.component';
import { ReadProveedorComponent } from './read-proveedor/read-proveedor.component';
import { UpdateProveedorComponent } from './update-proveedor/update-proveedor.component';
import { DeleteProveedorComponent } from './delete-proveedor/delete-proveedor.component';



@NgModule({
  declarations: [
    CreateProveedorComponent,
    ReadProveedorComponent,
    UpdateProveedorComponent,
    DeleteProveedorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CrudProveedorModule { }
