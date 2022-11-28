import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProveedorComponent } from './componentes/create-proveedor/create-proveedor.component';
import { ReadProveedorComponent } from './componentes/read-proveedor/read-proveedor.component';
import { UpdateProveedorComponent } from './componentes/update-proveedor/update-proveedor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from 'src/app/home/home.module';



@NgModule({
  declarations: [
    CreateProveedorComponent,
    ReadProveedorComponent,
    UpdateProveedorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule
  ]
})
export class CrudProveedorModule { }
