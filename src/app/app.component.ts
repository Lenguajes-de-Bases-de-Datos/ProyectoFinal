import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError,Observable,retry } from 'rxjs';
import { RequestsService } from './services/requests.service';
import swal from 'sweetalert2';
import { AuthGuardService } from './services/auth-guard.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crazy-candy';
  band:boolean=true;
  constructor(private request:RequestsService,private router:Router,public auth:AuthGuardService){
    let token = sessionStorage.getItem('token');

    if( token==null){ this.band = true;router.navigate(['/portal']);
    }else{
      
      request.verifyToken().subscribe({next:(resp:any)=>{
        this.auth.band = false;
        
        console.log("fiiii");
        router.navigate(['/paginainicio']);

      },
      error:(err:any)=>{
        if(err.status===401){
          this.auth.band=true;
          sessionStorage.removeItem('token');
         
          swal.fire({
            allowOutsideClick: true,
            title: "Error de Session...",
            text: "Tu session ha expirado por favor vuelve a autenticarte...",
            confirmButtonText:'Entendido'
          });
          router.navigate(['/portal'])
        }
      },
      complete:()=>console.log("done")
    });
   
    }
  

  }
  change(e:any){
    // e.preventDefault();
    this.auth.band?this.auth.band=false:this.auth.band=true;
    this.router.navigate(['/paginainicio']);
  }
}
