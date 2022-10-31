import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestsService } from './requests.service';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  band:boolean = true;
  constructor(public router: Router,private request:RequestsService) { }

  canActivate(

    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

 

      let token = sessionStorage.getItem('token');
    console.log("tokkk"+token);
    if( token==null){ this.band = true;this.router.navigate(['/portal']);
    }else{
      
      this.request.verifyToken().subscribe({next:(resp:any)=>{
        this.band = false;
        console.log("fiiii");
        
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
          this.router.navigate(['/portal']);
          
        }
      },
      complete:()=>console.log("done")
    });

  }
  if(this.band){
    return false;
  }else{
    return true;
  }

      // console.log('entre!');
      // if (true) {

      //   this.router.navigate(['/read-users']);

      //   return false;

      // }

      // return true;

  }
}
