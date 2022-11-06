import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUbicacionComponent } from './componentes/create-ubicacion/create-ubicacion.component';
import { ReadUbicacionComponent } from './componentes/read-ubicacion/read-ubicacion.component';
import { UpdateUbicacionComponent } from './componentes/update-ubicacion/update-ubicacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapitalizacionPipePipe } from 'src/app/pipe/capitalizacion-pipe.pipe';
import { HomeModule } from 'src/app/home/home.module';



@NgModule({
  declarations: [
    CreateUbicacionComponent,
    ReadUbicacionComponent,
    UpdateUbicacionComponent,
    CapitalizacionPipePipe
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    HomeModule,
  ]
})
export class CrudUbicacionModule { }
