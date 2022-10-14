import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ReadUserComponent } from './read-user/read-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';



@NgModule({
  declarations: [
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
    CreateUserComponent,
    ReadUserComponent,
    UpdateUserComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CrudUsersModule { }
