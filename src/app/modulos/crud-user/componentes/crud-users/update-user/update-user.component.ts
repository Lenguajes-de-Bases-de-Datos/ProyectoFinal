import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  bandID:boolean=true;
  bandT:boolean=true;
  user:string="";
  id_user:number=0;
  form:FormGroup=new FormGroup({});
  type = "password";
  sucursales:any[]=[];
  count:number=0;
  priv:string="";

  constructor(private request:RequestsService, private router:Router, private active:ActivatedRoute) { 
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

    this.active.params.subscribe((params:Params)=>{
      if(params['id'] == undefined){

      }else{
        this.id_user=params['id'];
        console.log(this.id_user);
        this.request.consultas(`SELECT * FROM usuario where id=${params['id']}`).subscribe((res:any)=>{
          this.form.controls['sucursal'].setValue(res[0].ID_sucursal);
          //this.form.controls['password'].setValue(res[0].password);
          this.form.controls['nombre'].setValue(res[0].nombre);
          this.form.controls['appat'].setValue(res[0].appat);
          this.form.controls['apmat'].setValue(res[0].apmat);
          if(res[0].privilegios == "vendedor"){
            this.priv="Vendedor";
          }else if(res[0].privilegios == "administrador"){
            this.priv="Administrador";
          }else if(res[0].privilegios == "reponedor"){
            this.priv="Reponedor";
          }else if(res[0].privilegios == "almacenista"){
            this.priv="Almacenista";
          }else{
            this.priv="Superadmin";
          }
          this.form.controls['privilegios'].setValue(this.priv);
          this.form.controls['desc'].setValue(res[0].desc);
          this.form.controls['email'].setValue(res[0].email);
          this.form.controls['phone'].setValue(res[0].telefono);
          this.form.controls['salario'].setValue(res[0].salario);
          let gen = "hombre";
          if(res[0].genero == 'm'){
            gen=gen;
          }else{
            gen="mujer";
          }
          this.form.controls['genero'].setValue(gen);
        });
        console.log(this.form.value);

      }
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
    /*let mysql = `INSERT INTO usuario (ID,ID_sucursal,password,nombre,appat,apmat,privilegios,des,email,telefono,salario,genero,fecha)
    VALUES(ID,${this.form.get('sucursal')?.value.charAt(0)},sha2('${this.form.get('password')?.value}',256),LOWER('${this.form.get('nombre')?.value}'),LOWER('${this.form.get('appat')?.value}'),
    LOWER('${this.form.get('apmat')?.value}'),'${this.form.get('privilegios')?.value.toLowerCase()}',LOWER('${this.form.get('desc')?.value}'),'${this.form.get('email')?.value}','${this.form.get('phone')?.value}',
    ${this.form.get('salario')?.value},'${gender}',now())`;*/
    let mysql = `UPDATE usuario set ID_sucursal=${this.form.get('sucursal')?.value}, password=sha2('${this.form.get('password')?.value}',256),nombre=LOWER('${this.form.get('nombre')?.value}'),
    appat=LOWER('${this.form.get('appat')?.value}'),apmat=LOWER('${this.form.get('apmat')?.value}'),privilegios='${this.form.get('privilegios')?.value.toLowerCase()}',des=LOWER('${this.form.get('desc')?.value}'),
    email='${this.form.get('email')?.value}',telefono='${this.form.get('phone')?.value}',salario=${this.form.get('salario')?.value},genero='${gender}' where ID=${this.id_user}`;
    let params = {
      sql:mysql,
      table:'usuario'
      
    }
    
    
     this.request.accion(params).subscribe({next:(res:any)=>{
      if(res.band){
        swal.fire({
          allowOutsideClick: true,
          title: "Exito...",
          text: "Usuario actualizado exitosamente...",
          confirmButtonText:'Entendido'
        });
        this.form.reset();
        this.router.navigate(['/read-users']);
      }else{
        
        if(res.errno == 1062){
          swal.fire({
            allowOutsideClick: true,
            title: "Error ...",
            text: "No se pudo actualizar al usuario, Correo Duplicado...",
            confirmButtonText:'Entendido'
          });
        }else{
        swal.fire({
          allowOutsideClick: true,
          title: "Error ...",
          text: "No se pudo actualizar al usuario...",
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
  
  ngOnInit(): void {
  }

}
