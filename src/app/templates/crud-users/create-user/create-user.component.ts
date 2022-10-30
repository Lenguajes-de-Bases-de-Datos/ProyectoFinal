import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  type = "password";
  sucursales:any[]=[];
  constructor(private request:RequestsService) { 
    this.form = new FormGroup({
      nombre:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      appat:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      apmat:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      password:new FormControl('',[Validators.required,Validators.pattern('[^\'"!|&]{3,10}')]),
      email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]+$/)]),
      privilegios:new FormControl('',[Validators.required]),
      sucursal:new FormControl('',[Validators.required]),
      desc:new FormControl('',[Validators.required]),
      
      
    });

    this.request.ReadSucursal('/readSucursal').subscribe((res:any)=>{
      this.sucursales = res;


    });
  }

  ngOnInit(): void {
  }
  showp(){
    this.type="text"
  } 
  hiddenp(){
    this.type="password"
  }
  send(){
    let params = {
      ID_sucursal:this.form.get('sucursal')?.value.charAt(0),
      password:this.form.get('password')?.value,
      nombre:this.form.get('nombre')?.value,
      appat:this.form.get('appat')?.value,
      apmat:this.form.get('apmat')?.value,
      privilegios:this.form.get('privilegios')?.value.toLowerCase(),
      des:this.form.get('desc')?.value,
      email:this.form.get('email')?.value
      
    }
    
    console.log(this.form.get('nombre')?.invalid);
     this.request.insert('/insertUser',params).subscribe((res:any)=>{
      if(res.band){
        swal.fire({
          allowOutsideClick: true,
          title: "Exito...",
          text: "Usuario agregado exitosamente...",
          confirmButtonText:'Entendido'
        });
        this.form.reset();
      }else{
        swal.fire({
          allowOutsideClick: true,
          title: "Error ...",
          text: "No se pudo agregar al usuario...",
          confirmButtonText:'Entendido'
        });
      }
     });
  }
}
