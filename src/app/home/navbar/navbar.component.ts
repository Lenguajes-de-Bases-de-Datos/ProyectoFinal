import { Component, OnInit } from '@angular/core';
import { SocketsWebService } from 'src/app/services/sockets-web.service';
declare const events : any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  notifications:any[]=[];
  count:number = 0;
  band_paused:boolean=true;
  constructor(public socket:SocketsWebService) { 
   socket.callback.subscribe((res:any)=>{
     this.notifications=res;
     this.count = this.notifications.length;
    setInterval(()=>{
      this.band_paused=false;
    },4000);
    });
  socket.receive.subscribe((res:any)=>{
    this.band_paused=true;
    setInterval(()=>{
      this.band_paused=false;
    },4000);
    
    this.notifications.push(res);
    this.count++;
    });
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    events();
  }
  logOut(){
    
  }
  updateCount(i:number){
    if(this.notifications[i].cont == 0){

    }else{
      this.count--;
      this.notifications[i].cont=0;
    }
    
  }
}
