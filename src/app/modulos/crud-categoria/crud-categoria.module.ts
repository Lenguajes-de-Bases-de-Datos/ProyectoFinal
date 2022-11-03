import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoriaComponent } from './componentes/crud-categoria/create-categoria/create-categoria.component';
import { UpdateCategoriaComponent } from './componentes/crud-categoria/update-categoria/update-categoria.component';
import { ReadCategoriaComponent } from './componentes/crud-categoria/read-categoria/read-categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from 'src/app/home/home.module';



@NgModule({
  declarations: [
    CreateCategoriaComponent,
    UpdateCategoriaComponent,
    ReadCategoriaComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CrudCategoriaModule { }
