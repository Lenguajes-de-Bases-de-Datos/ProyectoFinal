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
    room:'',
    header:''
  }
  msg:String="";
  constructor(private socket:SocketsWebService) { 
    let user:any = localStorage.getItem('cuenta');
    user = JSON.parse(user);
    this.payload.author = `${user.nombre} ${user.appat} ${user.apmat}`;
    user.privilegios=="superadmin"?this.payload.room = 0:this.payload.room = user.ID_sucursal;
    user.privilegios=="superadmin"?this.payload.header = 'Aviso para todas las sucursales':this.payload.header = 'Aviso en mi sucursal';
    
     
  }

  ngOnInit(): void {
  }
  sendMsg(){
   
    this.socket.emitEvent(this.payload);
  }
  receiveMsg(){

  }
}
