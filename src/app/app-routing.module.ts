import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './home/default/default.component';
import { LoginComponent } from './home/login/login.component';
import { PortalComponent } from './home/portal/portal.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RequestsService } from './services/requests.service';
import { CreateUserComponent } from './modulos/crud-user/componentes/crud-users/create-user/create-user.component';
import { ReadUserComponent } from './modulos/crud-user/componentes/crud-users/read-user/read-user.component';
import { SendMessageComponent } from './templates/send-message/send-message.component';
import { UpdateUserComponent } from './modulos/crud-user/componentes/crud-users/update-user/update-user.component';
import { DeleteUserComponent } from './modulos/crud-user/componentes/crud-users/delete-user/delete-user.component';
import { CreateCategoriaComponent } from './modulos/crud-categoria/componentes/crud-categoria/create-categoria/create-categoria.component';
import { ReadCategoriaComponent } from './modulos/crud-categoria/componentes/crud-categoria/read-categoria/read-categoria.component';
import { UpdateCategoriaComponent } from './modulos/crud-categoria/componentes/crud-categoria/update-categoria/update-categoria.component';
import { HomeModule } from './home/home.module';
import { CardCategoriaComponent } from './modulos/crud-categoria/componentes/crud-categoria/card-categoria/card-categoria.component';
const routes: Routes = [
  {path:'portal', component:PortalComponent},
  {path:'sign-up',component:CreateUserComponent,canActivate:[AuthGuardService],data:['administrador']},
  {path:'read-users', component:ReadUserComponent},
  {path:'update-user', component:UpdateUserComponent},
  {path:'delete-user', component:DeleteUserComponent},
  {path:'send-msg',component:SendMessageComponent},
  {path:'create-categoria',component:CreateCategoriaComponent},
  {path:'read-categoria',component:ReadCategoriaComponent},
  {path:'card-categoria/:id',component:CardCategoriaComponent},
  {path:'update-categoria/:id',component:UpdateCategoriaComponent},
  {path:'update-categoria',component:UpdateCategoriaComponent},

  {path:'**',component:PortalComponent},
  {path:'default',component:DefaultComponent},

 
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes),ReactiveFormsModule,FormsModule],
  exports: [RouterModule,ReactiveFormsModule],
  providers:[RequestsService,AuthGuardService]

})
export class AppRoutingModule { }
