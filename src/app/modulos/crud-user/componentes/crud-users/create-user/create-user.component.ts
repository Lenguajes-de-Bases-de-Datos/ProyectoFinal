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
  count:number=0;
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
      phone:new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/)]),
      salario: new FormControl('',[Validators.required,Validators.pattern('[0-9]+\.\[0-9]+')]),
      genero: new FormControl('',[Validators.required])
    });
    
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
    this.request.consultas('SELECT b.id,a.estado,a.ciudad,a.colonia,b.calle,b.numero FROM ubicacion a,sucursal b WHERE a.id=b.id_ubicacion').subscribe((res:any)=>{
      this.sucursales = res;
      swal.close();

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
    let gender;
    if(this.form.get('genero')?.value == "hombre"){
      gender='m';
    }else{
      gender="f";
    }
    let mysql = `INSERT INTO usuario (ID_sucursal,password,nombre,appat,apmat,privilegios,des,email,telefono,salario,genero,fecha)
    VALUES(${this.form.get('sucursal')?.value.charAt(0)},sha2('${this.form.get('password')?.value}',256),LOWER('${this.form.get('nombre')?.value}'),LOWER('${this.form.get('appat')?.value}'),
    LOWER('${this.form.get('apmat')?.value}'),'${this.form.get('privilegios')?.value.toLowerCase()}',LOWER('${this.form.get('desc')?.value}'),'${this.form.get('email')?.value}','${this.form.get('phone')?.value}',
    ${this.form.get('salario')?.value},'${gender}',now())`;
    let params = {
      sql:mysql,
      table:'usuario'
      
    }
    
    
     this.request.accion(params).subscribe({next:(res:any)=>{
      if(res.band){
        swal.fire({
          allowOutsideClick: true,
          title: "Exito...",
          text: "Usuario agregado exitosamente...",
          confirmButtonText:'Entendido'
        });
        this.form.reset();
      }else{
        
        if(res.errno == 1062){
          swal.fire({
            allowOutsideClick: true,
            title: "Error ...",
            text: "No se pudo agregar al usuario, Correo Duplicado...",
            confirmButtonText:'Entendido'
          });
        }else{
        swal.fire({
          allowOutsideClick: true,
          title: "Error ...",
          text: "No se pudo agregar al usuario...",
          confirmButtonText:'Entendido'
        });
        }
      }
    
     },
     error:(res:any)=>{
      swal.fire({
        allowOutsideClick: true,
        title: "Error ...",
        text: "No se pudo agregar al usuario...",
        confirmButtonText:'Entendido'
      });
     }});
  }
  formatear(event:any){
    let valor = this.form.get('phone')?.value;
   
    let tamanio = valor.length;
   
    if(event.keyCode == 8){
      
    }else{
    if(tamanio==3 || tamanio==7 ){
      
      let aux = this.form.get('phone')?.value;
      this.form.controls['phone'].setValue(aux+"-");
      
    }else if(tamanio==10 ){
      let aux = this.form.get('phone')?.value;
      this.form.controls['phone'].setValue(aux+"-");
      this.count++;
      
    }
    }
  }
}
