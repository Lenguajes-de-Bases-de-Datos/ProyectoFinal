import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';
import{UntypedFormGroup,UntypedFormControl, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import { User } from 'src/app/interfaces/user.model';
import { SocketsWebService } from 'src/app/services/sockets-web.service';
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
  constructor(private requests:RequestsService) { 
    this.form=new UntypedFormGroup({
      user:new UntypedFormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]+$/)]),
      pass:new UntypedFormControl('',[Validators.required,Validators.pattern('[^\'"!]{3,10}')])


    });
  }

  ngOnInit(): void {
  }
  logIn():void{
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
      console.log('token '+res.msg+" datos: "+JSON.stringify(res.datos));
      swal.close();
      if(res.msg!=undefined){
        sessionStorage.setItem('token',res.msg);
        let datos = JSON.stringify(res.datos);
        let user:User = JSON.parse(datos);
        console.log("name: "+user.nombre);
      
        this.messageEvent.emit(false);
      }else{
        swal.fire({
          allowOutsideClick: true,
          title: "Datos invalidos...",
          text: "Los datos no estan registrados...",
          confirmButtonText:'Entendido'
        });

      }
    });

  }
}
