import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserComponent } from './create-user/create-user.component';
import { ReadUserComponent } from './read-user/read-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

import { ReactiveFormsModule } from '../templates.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TemplatesModule } from '../templates.module';
import { AppModule } from 'src/app/app.module';
@NgModule({
  declarations: [
    
    
    CreateUserComponent,
    ReadUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    
  ],
  imports: [

    CommonModule,
    AppRoutingModule,
    TemplatesModule,
    ReactiveFormsModule
  ],
  exports:[CreateUserComponent,DeleteUserComponent,UpdateUserComponent,ReadUserComponent]

})
export class CrudUsersModule { }
