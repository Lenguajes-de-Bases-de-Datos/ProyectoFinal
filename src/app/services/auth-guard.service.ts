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
   
    if( token==null){ this.band = true;this.router.navigate(['/portal']);
    }else{
      
      this.request.verifyToken().subscribe({next:(resp:any)=>{
        this.band = false;
      
        
      },
      error:(err:any)=>{
        if(err.status===401 && !this.band){



          swal.fire({
            backdrop:true,
            title: 'Tu sesion ha expirado ',
            text: "¿Deseas extenderla?",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Si, acepto.`,
            cancelButtonText:"No",
            icon:'warning'
          }).then((result)=>{
            if(result.value){
              let cuenta:any = localStorage.getItem('cuenta');
              if(cuenta === null){

              }else{
                cuenta = JSON.parse(cuenta);
              }
              let body = {
                nombre:cuenta.email,
                password:cuenta.password
              } 
              
              this.request.extender(body).subscribe((res:any)=>{
                
                if(res.msg != undefined){
                  sessionStorage.setItem('token',res.msg);
                 
                  swal.fire({
                    backdrop:true,
                    allowOutsideClick: true,
                    title: "Exito...",
                    text: `Tu sesion ha sido actualizada...`,
                    confirmButtonText:'Entendido',
                    icon:"success"
                  });
                }else{
                  swal.fire({
                    backdrop:true,
                    allowOutsideClick: true,
                    title: "Error...",
                    text: `Por favor vuelve a iniciar sesion...`,
                    confirmButtonText:'Entendido',
                    icon:"error"
                  });
                }
              });
              
              
              
            }else{
              this.reubicar();
            }
          });

          
          
        }else{
          this.reubicar();
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
  reubicar(){
    this.band=true;
    sessionStorage.removeItem('token');
    
    swal.fire({
      backdrop:true,
      allowOutsideClick: true,
      title: "Error de Session...",
      text: "Tu session ha expirado por favor vuelve a autenticarte...",
      confirmButtonText:'Entendido'
    });
    this.router.navigate(['/portal']);
  }
}
