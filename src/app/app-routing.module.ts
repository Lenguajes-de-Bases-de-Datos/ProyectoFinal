import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './home/default/default.component';
import { LoginComponent } from './home/login/login.component';
import { PortalComponent } from './home/portal/portal.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RequestsService } from './services/requests.service';
import { CreateUserComponent } from './templates/crud-users/create-user/create-user.component';
import { ReadUserComponent } from './templates/crud-users/read-user/read-user.component';
import { SendMessageComponent } from './templates/send-message/send-message.component';
import { UpdateUserComponent } from './templates/crud-users/update-user/update-user.component';
import { DeleteUserComponent } from './templates/crud-users/delete-user/delete-user.component';
import { CreateCategoriaComponent } from './templates/crud-categoria/create-categoria/create-categoria.component';
import { ReadCategoriaComponent } from './templates/crud-categoria/read-categoria/read-categoria.component';
import { UpdateCategoriaComponent } from './templates/crud-categoria/update-categoria/update-categoria.component';
import { HomeModule } from './home/home.module';
const routes: Routes = [
  {path:'portal', component:PortalComponent},
  {path:'sign-up',component:CreateUserComponent,canActivate:[AuthGuardService],data:['administrador']},
  {path:'read-users', component:ReadUserComponent},
  {path:'update-user', component:UpdateUserComponent},
  {path:'delete-user', component:DeleteUserComponent},
  {path:'send-msg',component:SendMessageComponent},
  {path:'create-categoria',component:CreateCategoriaComponent},
  {path:'read-categoria',component:ReadCategoriaComponent},
  {path:'update-categoria',component:UpdateCategoriaComponent},
  {path:'**',component:PortalComponent},
  {path:'default',component:DefaultComponent},

 
];

@NgModule({
  declarations:[
    CreateCategoriaComponent,ReadCategoriaComponent,UpdateCategoriaComponent],
  imports: [CommonModule,RouterModule.forRoot(routes),ReactiveFormsModule,FormsModule],
  exports: [RouterModule,ReactiveFormsModule],
  providers:[RequestsService]

})
export class AppRoutingModule { }
