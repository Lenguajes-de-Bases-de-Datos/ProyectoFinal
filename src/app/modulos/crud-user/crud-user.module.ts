import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserComponent } from './componentes/crud-users/create-user/create-user.component';
import { DeleteUserComponent } from './componentes/crud-users/delete-user/delete-user.component';
import { UpdateUserComponent } from './componentes/crud-users/update-user/update-user.component';
import { ReadUserComponent } from './componentes/crud-users/read-user/read-user.component';

import { HomeModule } from 'src/app/home/home.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoreUserComponent } from './componentes/crud-users/more-user/more-user.component';
import { GraficaGeneroComponent } from './componentes/grafica-genero/grafica-genero.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    CreateUserComponent,
    DeleteUserComponent,
    UpdateUserComponent,
    ReadUserComponent,
    MoreUserComponent,
    GraficaGeneroComponent,
  ],
  imports: [
    CommonModule,

    HomeModule, ReactiveFormsModule,
    FormsModule,
    NgChartsModule
  ],
  exports:[CreateUserComponent]
})
export class CrudUserModule { }
