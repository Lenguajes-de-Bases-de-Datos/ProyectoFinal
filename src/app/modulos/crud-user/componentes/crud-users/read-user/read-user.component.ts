import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css']
})
export class ReadUserComponent implements OnInit {
  users:any[] = [];
  option:string = "1";
  controlador:number = 0;
  form!:FormGroup;
  title:string='Todos';
  cont:number = 0;
  contpag:number=1;
  sql:string="SELECT * FROM usuario";
  bandMore:boolean=false;
  issuper:boolean=false;
  user:any;
  @ViewChild('paginacion') element?:PaginacionComponent;
  constructor(private request:RequestsService,private router:Router) {
    
    this.sql = "SELECT * FROM usuario";
    this.user = localStorage.getItem('cuenta');
    this.user = JSON.parse(this.user);
    if(this.user.privilegios == "superadmin"){
      this.issuper = true;
    }else{
      this.sql += ` WHERE id_sucursal = ${this.user.ID_sucursal}`
    }


    this.request.consultas(this.sql+' LIMIT 0,11').subscribe((res:any)=>{
      this.users = res;
    });

    this.form = new FormGroup({
      nombre : new FormControl('example',[Validators.required,Validators.pattern('[^|\"\'&!$()?`]+')]),
      appat : new FormControl('prueba',[Validators.required,Validators.pattern('[^|\"\'&!$()?`]+')]),
      apmat : new FormControl('prueba',[Validators.required,Validators.pattern('[^|\"\'&!$()?`]+')]),
      id : new FormControl('123',[Validators.required,Validators.pattern('[0-9]+')]),
      email : new FormControl('prueba@gmail.com',[Validators.required,Validators.email]),
      suc : new FormControl('1',[Validators.required,Validators.pattern("[0-9]+")]),
      fechaini : new FormControl('1',[Validators.required]),
      fechafin : new FormControl('1',[Validators.required]),
      
    });
   }

  ngOnInit(): void {
  }
  
  buscar(){
    this.controlador = 0;
    this.cont = 0;
    this.contpag = 1;
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
    }else if(this.option == "8"){
      this.controlador = 4;
      this.sql = `SELECT * FROM usuario WHERE id_sucursal = ${this.form.get('suc')?.value}`;
      this.title = 'Por sucursal';
      
    }else if(this.option == "9"){
      this.controlador = 5;
      this.sql = `SELECT * FROM usuario WHERE DATE(fecha) = '${this.form.get('fechaini')?.value}'`;
      this.title = 'Por fecha de contratación';
      
    }else if(this.option == "10"){
      this.controlador = 6;
      this.sql = `SELECT * FROM usuario WHERE DATE(fecha) BETWEEN '${this.form.get('fechaini')?.value}' AND '${this.form.get('fechafin')?.value}'`;
      this.title = 'Por rango de fecha de contratación';
      
    }
    if(this.issuper){

    }else{
      if(this.option!="1"){
        this.sql += ` and id_sucursal = ${this.user.ID_sucursal}`;
      }else{
        this.sql += ` WHERE id_sucursal = ${this.user.ID_sucursal}`;
        
      }
    }
    setTimeout(()=>{
      this.element?.reinicia();
    },100);
  }
  change(){
    this.controlador = 0;
    this.form.controls['nombre'].setValue('example');
    this.form.controls['appat'].setValue('example');
    this.form.controls['apmat'].setValue('example');
    this.form.controls['id'].setValue('123');
    this.form.controls['email'].setValue('example@gmail.com');
    this.form.controls['suc'].setValue('1');
    this.form.controls['fechaini'].setValue('1');
    this.form.controls['fechafin'].setValue('1');
    

   if(this.option == "1" || this.option == "2" || this.option == "3" || this.option == "4"){
      this.buscar();
   }else if(this.option == "5"){
      this.controlador = 1;
      this.form.controls['nombre'].setValue('');
      this.form.controls['appat'].setValue('');
      this.form.controls['apmat'].setValue('');
     

    }else if(this.option == "6"){
      this.controlador = 2;
      this.form.controls['id'].setValue('');
      
    }else if(this.option == "7"){
      this.controlador = 3;
      this.form.controls['email'].setValue('');

    }else if(this.option == "8"){
      this.controlador = 4;
      this.form.controls['suc'].setValue('');
    }else if (this.option == "9"){
      this.controlador = 5;
      this.form.controls['fechaini'].setValue('');
    
    }else if(this.option == "10"){
      this.controlador = 6;
      this.form.controls['fechaini'].setValue('');
      this.form.controls['fechafin'].setValue('');
    
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

  accion(id:number,num:number){
    let texto:string="",action:string="",stat:number;
    if(num==1){
      texto="eliminar";
      stat=0;
      action="Eliminación";
    }else{
      texto="dar de alta";
      stat=1;
      action="Actualización";
    }
    swal.fire({
      title: '¿Esta seguro de hacerlo?',
      text: "luego no puede modificar los datos!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si, deseo ${texto}.`,
      icon:'warning'
    }).then((result)=>{
      if(result.value){
        let sql=`UPDATE usuario set status=${stat} where ID=${id}`;
        let body={
          sql:sql,
          table:"usuario"
        }
        this.request.accion(body).subscribe({next:(res:any)=>{
          if(res.band){
            swal.fire({
              allowOutsideClick: true,
              title: "Exito...",
              text: `${action} de usuario exitosamente...`,
              confirmButtonText:'Entendido'
            });
          }else{
            swal.fire({
              allowOutsideClick: true,
              title: "Error ...",
              text: `${action} de usuario exitosamente...`,
              confirmButtonText:'Entendido'
            });
          }
        },
        error:(res:any)=>{
          swal.fire({
            allowOutsideClick: true,
            title: "Error ...",
            text: `${action} de usuario exitosamente...`,
            confirmButtonText:'Entendido'
          });
        }});
        
      }else{
        swal.fire({
          allowOutsideClick: true,
          title: "Cancelación de acción...",
          text: `${action} de usuario exitosamente...`,
          confirmButtonText:'Entendido',
          icon:"success"
        });
      }
    });
    
  }
  filtro(option:number){
    let aux = "";
    this.buscar();
    if(this.option == "1"){
      if(option == 1){
        aux = this.sql;
      }else if(option == 2){
        aux = this.sql+" WHERE status = 1";
      }else{
       aux = this.sql += " WHERE status = 0";
      }
    }else{
      if(option == 1){
        aux = this.sql;
      }else if(option == 2){
        aux = this.sql+" and status = 1";
      }else{
       aux = this.sql += " and status = 0";
      }
    } 
    this.sql = aux ;
  }
  moreUser(id:number){
    this.router.navigate([`/more-user/${id}`]);
  }
  update(id:number){
    this.router.navigate(['/update-user',id]);
    
  }
}
