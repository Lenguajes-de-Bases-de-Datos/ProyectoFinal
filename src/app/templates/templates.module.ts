import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendMessageComponent } from './send-message/send-message.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
export{ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from '../app-routing.module';
import { HomeModule } from '../home/home.module';
import { CreateUserComponent } from './crud-users/create-user/create-user.component';
import { ReadUserComponent } from './crud-users/read-user/read-user.component';
import { UpdateUserComponent } from './crud-users/update-user/update-user.component';
import { DeleteUserComponent } from './crud-users/delete-user/delete-user.component';

@NgModule({
  declarations: [
    SendMessageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule
    ]
    
})
export class TemplatesModule { }
