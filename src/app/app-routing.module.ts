import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { PortalComponent } from './home/portal/portal.component';
import { DeleteUserComponent } from './templates/crud-users/delete-user/delete-user.component';
import { SendMessageComponent } from './templates/send-message/send-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateUserComponent } from './templates/crud-users/update-user/update-user.component';

const routes: Routes = [
  {path:'portal', component:PortalComponent},
  {path:'send-msg',component:SendMessageComponent},
  {path:'delete-user', component:DeleteUserComponent},
  {path:'update-user', component:UpdateUserComponent}
];

@NgModule({
  declarations:[DeleteUserComponent,UpdateUserComponent],
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule,CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
