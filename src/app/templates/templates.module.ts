import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendMessageComponent } from './send-message/send-message.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SendMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
    ]
})
export class TemplatesModule { }
