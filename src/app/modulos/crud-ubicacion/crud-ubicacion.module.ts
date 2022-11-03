import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUbicacionComponent } from './componentes/create-ubicacion/create-ubicacion.component';
import { ReadUbicacionComponent } from './componentes/read-ubicacion/read-ubicacion.component';
import { UpdateUbicacionComponent } from './componentes/update-ubicacion/update-ubicacion.component';



@NgModule({
  declarations: [
    CreateUbicacionComponent,
    ReadUbicacionComponent,
    UpdateUbicacionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CrudUbicacionModule { }
