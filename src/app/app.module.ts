import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from "@angular/common/http";
import {ReactiveFormsModule} from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { TemplatesModule } from './templates/templates.module';
import { PaginacionComponent } from './paginacion/paginacion.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PaginacionComponent 
  ],
  imports: [
    BrowserModule,
    
    HomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocketIoModule,
    FormsModule,
    AppRoutingModule
   
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[PaginacionComponent]
})
export class AppModule { }
