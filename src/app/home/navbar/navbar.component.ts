import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
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
  name!:any;
  
  constructor(public socket:SocketsWebService,private router:Router,private auth:AuthGuardService) { 
    let user:any = localStorage.getItem('cuenta') || "";
    user = JSON.parse(user);
    //esta parte verifica si ya se habia usado anteriormente un socket
    //en caso de que si, solo vuelve a establecer una nueva conección
    //y en caso de que no, no realiza nada ya que, el constructor del
    //servicio socket con el constructor la realiza, este caso aplicaria
    //solo la primera vez que se invoca al servicio...
    if(!this.socket.isFirst){
      this.socket.conneccion();
    }
    if(user!=undefined){
      
      this.name = user.nombre+" "+user.appat+" "+user.apmat;
    }
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
    localStorage.removeItem('cuenta');
    sessionStorage.removeItem('token');
    this.auth.band = true;
    this.router.navigate(['/portal']);
    this.socket.logOut();
  }
  //Actualiza el contador de la bubble que indica el número de notificaciones...
  //una vez que se da clic sobre una notificacion se decrementa el contador.
  updateCount(i:number){
    if(this.notifications[i].cont == 0){

    }else{
      this.count--;
      this.notifications[i].cont=0;
    }
    
  }
}
