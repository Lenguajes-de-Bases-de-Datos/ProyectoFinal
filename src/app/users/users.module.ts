import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ReadusersComponent } from './readusers/readusers.component';

@NgModule({
  declarations: [
    AdminComponent,
    SignupComponent,
    ReadusersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
