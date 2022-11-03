import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css']
})
export class ReadUserComponent implements OnInit {
  users:any[] = [];
  option:string = "";
  controlador:number = 0;
  form!:FormGroup;
  title:string='Todos';
  cont:number = 0;
  contpag:number=1;
  sql:string="SELECT * FROM usuario";
  constructor(private request:RequestsService) {
    this.request.consultas('SELECT * FROM usuario LIMIT 0,11').subscribe((res:any)=>{
      this.users = res;
    });

    this.sql = "SELECT * FROM usuario";
    this.form = new FormGroup({
      nombre : new FormControl('example',[Validators.required,Validators.pattern('[^|\"\'&!$()?`]+')]),
      appat : new FormControl('prueba',[Validators.required,Validators.pattern('[^|\"\'&!$()?`]+')]),
      apmat : new FormControl('prueba',[Validators.required,Validators.pattern('[^|\"\'&!$()?`]+')]),
      id : new FormControl('123',[Validators.required,Validators.pattern('[0-9]+')]),
      email : new FormControl('prueba@gmail.com',[Validators.required,Validators.email])
    });
   }

  ngOnInit(): void {
  }
  
  buscar(){
    this.controlador = 0;
    console.log(this.option);
     this.sql = `SELECT * FROM usuario WHERE privilegios = `;
    if(this.option == "1"){
      this.sql = `SELECT * FROM usuario`;
      this.title = 'Todos';
    }else if(this.option == "2"){
      this.sql += `'vendedor'`;
      this.title = 'Vendedores';
    }else if(this.option == "3"){
      this.sql += `'almacenista'`;
      this.title = 'Almacenistas';
    }else if(this.option == "4"){
      this.sql += `'reponedor'`;
      this.title = 'Reponedores';
    }else if(this.option == "5"){
      this.controlador = 1;
      this.sql = `SELECT * FROM usuario WHERE LOWER(nombre)=LOWER('${this.form.get('nombre')?.value}')
       and LOWER(appat) = LOWER('${this.form.get('appat')?.value}') 
       and LOWER(apmat) = LOWER('${this.form.get('apmat')?.value}')`;
       this.title = 'Por nombre';
    }else if(this.option == "6"){
      this.controlador = 2;
      this.sql = `SELECT * FROM usuario WHERE id = ${this.form.get('id')?.value}`;
      this.title = 'Por id';
    }else if(this.option == "7"){
      this.controlador = 3;
      this.sql = `SELECT * FROM usuario WHERE email = '${this.form.get('email')?.value}'`;
      this.title = 'Por correo electrónico';
    }
    this.request.consultas(this.sql).subscribe((res:any)=>{
      this.users = res;
    });
  }
  change(){
    if(this.option == "5"){
      this.controlador = 1;
      this.form.controls['nombre'].setValue('');
      this.form.controls['appat'].setValue('');
      this.form.controls['apmat'].setValue('');
      this.form.controls['id'].setValue('123');
      this.form.controls['email'].setValue('example@gmail.com');


    }else if(this.option == "6"){
      this.controlador = 2;
      this.form.controls['nombre'].setValue('example');
      this.form.controls['appat'].setValue('example');
      this.form.controls['apmat'].setValue('example');
      this.form.controls['id'].setValue('');
      this.form.controls['email'].setValue('example@gmail.com');

    }else if(this.option == "7"){
      this.controlador = 3;
      this.form.controls['nombre'].setValue('example');
      this.form.controls['appat'].setValue('example');
      this.form.controls['apmat'].setValue('example');
      this.form.controls['id'].setValue('123');
      this.form.controls['email'].setValue('');

    }else{
      this.controlador = 0;
      this.form.controls['nombre'].setValue('example');
      this.form.controls['appat'].setValue('example');
      this.form.controls['apmat'].setValue('example');
      this.form.controls['id'].setValue('123');
      this.form.controls['email'].setValue('example@gmail.com');

    }
  }
  next(){
    this.contpag++;
    this.cont+=10;
    this.request.consultas(`SELECT * FROM usuario LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.users = res;
    });
  }
  previous(){
    this.contpag--;
    this.cont-=10;
    this.request.consultas(`SELECT * FROM usuario LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.users = res;
    });
  }
  result(res:any){
    this.users = res;
  }
}
