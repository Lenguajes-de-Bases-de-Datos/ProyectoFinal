import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { PortalComponent } from './home/portal/portal.component';
import { ReadusersComponent } from './users/readusers/readusers.component';
import { SignupComponent } from './users/signup/signup.component';

const routes: Routes = [
  {path:'portal', component:PortalComponent},
  {path:'sign-up', component:SignupComponent},
  {path:'read-users', component:ReadusersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
