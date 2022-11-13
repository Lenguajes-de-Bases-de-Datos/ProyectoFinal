import { Component, OnInit } from '@angular/core';
import { SocketsWebService } from 'src/app/services/sockets-web.service';
@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  payload:any={
    author:"a1",
    text:"",
    room:''
  }
  msg:String="";
  constructor(private socket:SocketsWebService) { 
    let user:any = localStorage.getItem('cuenta');
    user = JSON.parse(user);
    this.payload.author = `${user.nombre}`;
    this.payload.room = user.ID_sucursal; 
  }

  ngOnInit(): void {
  }
  sendMsg(){
    console.log(this.payload);
    this.socket.emitEvent(this.payload);
  }
  receiveMsg(){

  }
}
