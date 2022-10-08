import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';
import{FormGroup,FormControl, Validators} from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password:string="password";
  pass:string="";
  user:string="";
  form!:FormGroup;
  constructor(private requests:RequestsService) { 
    this.form=new FormGroup({
      user:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]+$/)]),
      pass:new FormControl('',[Validators.required,Validators.pattern('[^\'"!]{3,10}')])


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
      console.log('token '+res.msg);
      swal.close();
    
      if(res.msg!=undefined){
        sessionStorage.setItem('token',res.msg);
        
      }else{
        alert('datos invalidos');

      }
    });

  }
}
