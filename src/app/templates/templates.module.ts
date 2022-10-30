import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendMessageComponent } from './send-message/send-message.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
export{ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    SendMessageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    ]
    
})
export class TemplatesModule { }
