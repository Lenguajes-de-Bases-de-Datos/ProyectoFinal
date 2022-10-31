import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './home/default/default.component';
import { LoginComponent } from './home/login/login.component';
import { PortalComponent } from './home/portal/portal.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RequestsService } from './services/requests.service';
import { CreateUserComponent } from './templates/crud-users/create-user/create-user.component';
import { ReadUserComponent } from './templates/crud-users/read-user/read-user.component';
import { SendMessageComponent } from './templates/send-message/send-message.component';

const routes: Routes = [
  {path:'portal', component:PortalComponent},
  {path:'sign-up',component:CreateUserComponent,canActivate:[AuthGuardService],data:['administrador']},
  {path:'read-users', component:ReadUserComponent},
  {path:'send-msg',component:SendMessageComponent},
  {path:'**',component:PortalComponent},
  {path:'default',component:DefaultComponent}
];

@NgModule({
  declarations:[CreateUserComponent],
  imports: [CommonModule,RouterModule.forRoot(routes),ReactiveFormsModule],
  exports: [RouterModule,ReactiveFormsModule],
  providers:[RequestsService]
})
export class AppRoutingModule { }
