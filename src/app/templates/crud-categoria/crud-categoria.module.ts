import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoriaComponent } from './create-categoria/create-categoria.component';
import { TemplatesModule } from '../templates.module';
import { ReactiveFormsModule } from '../templates.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReadCategoriaComponent } from './read-categoria/read-categoria.component';
import { UpdateCategoriaComponent } from './update-categoria/update-categoria.component';


@NgModule({
  declarations: [
    CreateCategoriaComponent,
    ReadCategoriaComponent,
    UpdateCategoriaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TemplatesModule,
    AppRoutingModule
  ],
  exports:[CreateCategoriaComponent,ReadCategoriaComponent,UpdateCategoriaComponent]
})
export class CrudCategoriaModule { }
