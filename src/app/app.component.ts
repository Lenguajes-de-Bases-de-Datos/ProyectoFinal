import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError,Observable,retry } from 'rxjs';
import { RequestsService } from './services/requests.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crazy-candy';
  band:boolean=true;
  constructor(private request:RequestsService,private router:Router){
    let token = sessionStorage.getItem('token');
    console.log("tokkk"+token);
    if( token==null){ this.band = true;
    }else{
      
      request.verifyToken().subscribe({next:(resp:any)=>{
        this.band = false;
        console.log("fiiii")
      },
      error:(err:any)=>{
        if(err.status===401){
          this.band=true;
          sessionStorage.removeItem('token');
          console.log("errrr");
          swal.fire({
            allowOutsideClick: true,
            title: "Error de Session...",
            text: "Tu session ha expirado por favor vuelve a autenticarte...",
            confirmButtonText:'Entendido'
          });
        }
      },
      complete:()=>console.log("done")
    });
   
    }
    console.log("banderita: "+this.band)


  }
  change(e:any){
    // e.preventDefault();
    this.band?this.band=false:this.band=true;
  }
}
