import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { SocketsWebService } from 'src/app/services/sockets-web.service';
import swal from 'sweetalert2';
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
  prod:string="";
  valid:boolean=true;
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
    setTimeout(()=>{
      this.band_paused=false;
    },4000);
    
   socket.callback.subscribe((res:any)=>{
     this.notifications=res;
     this.count = this.notifications.length;
    setTimeout(()=>{
      this.band_paused=false;
    },4000);
    });
  socket.receive.subscribe((res:any)=>{
    this.band_paused=true;
    setTimeout(()=>{
      this.band_paused=false;
    },4000);
    
    this.notifications.push(res);
    this.count++;
    });
  }
  buscar(){
    if(this.prod=="" || this.prod.match('[\'\"|&]+')){
      swal.fire({
        backdrop: true, 
        allowOutsideClick: true,
        title: "Texto incorrecto...",
        text: "No se permiten caracteres como \", ', |,etc...",
        confirmButtonText:'Entendido'
      });
    }else{
      this.router.navigate(['one-producto',this.prod]);
    }
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
  seen(){
    this.count= 0;
  }
}
