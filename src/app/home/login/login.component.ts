import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';
import{UntypedFormGroup,UntypedFormControl, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { User } from 'src/app/interfaces/user.model';
import { SocketsWebService } from 'src/app/services/sockets-web.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password:string="password";
  pass:string="";
  user:string="";
  form!:UntypedFormGroup;

  @Output() messageEvent = new EventEmitter<boolean>();
  constructor(private requests:RequestsService,private router:Router) { 
    this.form=new UntypedFormGroup({
      user:new UntypedFormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]+$/)]),
      pass:new UntypedFormControl('',[Validators.required,Validators.pattern('[^\'"!]{3,10}')])


    });
    try {
      let token = sessionStorage.getItem('token') || "";
      let resp = jwt_decode(token);
      console.log(resp)
    } catch(Error) {
      console.log(Error);
    }
  }

  ngOnInit(): void {
  }
  logIn():void{
    let band = true;
    let params={
      nombre:(this.form.get('user'))?.value,
      password:(this.form.get('pass'))?.value
    };
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
  //  let  param=JSON.stringify(params);
    this.requests.logIn(params).subscribe((res:any)=>{
     band=false;
      swal.close();
      if(res.msg!=undefined){
        sessionStorage.setItem('token',res.msg);
        let datos = JSON.stringify(res.datos);
        let user:User = JSON.parse(datos);
        localStorage.setItem('cuenta',datos);
      
        this.messageEvent.emit(false);
        
      }else{
        band=false;
        swal.fire({
          allowOutsideClick: true,
          title: "Datos invalidos...",
          text: "Los datos no estan registrados...",
          confirmButtonText:'Entendido'
        });

      }
    });
    setTimeout(()=>{
      if(swal.isVisible()&&band){
        swal.close();
        swal.fire({
          allowOutsideClick: true,
          title: "Servidor fuera de servicio...",
          text: "Al parecer el servidor no esta respondiendo, intente mas tarde...",
          confirmButtonText:'Entendido'
        });
      } 
    },5000);
    
  }
}
