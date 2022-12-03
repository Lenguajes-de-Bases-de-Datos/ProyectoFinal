import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProveedorComponent } from './componentes/create-proveedor/create-proveedor.component';
import { ReadProveedorComponent } from './componentes/read-proveedor/read-proveedor.component';
import { UpdateProveedorComponent } from './componentes/update-proveedor/update-proveedor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from 'src/app/home/home.module';
import { MoreProveedorComponent } from './componentes/more-proveedor/more-proveedor.component';



@NgModule({
  declarations: [
    CreateProveedorComponent,
    ReadProveedorComponent,
    UpdateProveedorComponent,
    MoreProveedorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule
  ]
})
export class CrudProveedorModule { }
