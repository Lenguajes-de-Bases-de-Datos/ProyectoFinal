import { destroyPlatform, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SocketsWebService {
  array:any[] = [];
  isFirst:boolean=true;
  callback:EventEmitter<any> = new EventEmitter();
  receive:EventEmitter<any> = new EventEmitter();
  ioSocket!:Socket;
  constructor() { 
    let user:any = localStorage.getItem('cuenta');
    user = JSON.parse(user);
    // super({
    //   url:"http://localhost:3000",
    //   options:{
    //     transports: ["websocket"],
    //     query:{
    //       room:`${user.ID_sucursal}`
    //     } 
    //   }
    // });
    this.ioSocket = new Socket({
      url:"http://localhost:3000",
      options:{
        autoConnect:false,
        transports:["websocket"],
        query:{
          room:`${user.ID_sucursal}`
        }
      }
    });
    this.ioSocket.on("messages",(res:any)=>{this.array = res; this.callback.emit(res)});
    this.ioSocket.on("notification",(res:any)=>{this.receive.emit(res)});
    this.ioSocket.connect();
  }
  conneccion(){
    let user:any = localStorage.getItem('cuenta');
    user = JSON.parse(user);
    // this.ioSocket.emptyConfig.options={
    //   autoConnect:false,
    //   transports:["websocket"],
    //   query:{
    //     room:`${user.ID_sucursal}`
    //   }
    // };
    this.ioSocket = new Socket({
      url:"http://localhost:3000",
      options:{
        autoConnect:false,
        transports:["websocket"],
        query:{
          room:`${user.ID_sucursal}`
        }
      }
    });
    this.ioSocket.on("messages",(res:any)=>{this.array = res; this.callback.emit(res)});
    this.ioSocket.on("notification",(res:any)=>{this.receive.emit(res)});
    this.ioSocket.connect();
  }
  emitEvent = (payload = {})=>{
    this.ioSocket.emit('msg',payload);
  }
  
  
  logOut(){
    this.isFirst=false;
    this.ioSocket.disconnect();
  }
}
