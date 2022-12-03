import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-read-proveedor',
  templateUrl: './read-proveedor.component.html',
  styleUrls: ['./read-proveedor.component.css']
})
export class ReadProveedorComponent implements OnInit {
  proveedores:any[]=[];
  title:string='Todos';
  cont:number = 0;
  contpag:number=1;
  sql:string="SELECT * FROM proveedor";
  option:string="1";
  controlador:number = 0;
  idProveedor:string="";
  nomEncargado:string="";

  @ViewChild('paginacion') element?:PaginacionComponent;
  constructor(private request:RequestsService, private router:Router) {
    let mysql = `CREATE OR REPLACE VIEW nomcomprov AS SELECT id,concat(nencargado,' ',appat,' ',apmat) nomcom FROM proveedor`;

    let params = {
      sql:mysql,
      table:'ubicacion'
    };
    this.request.consultas('SELECT * FROM proveedor LIMIT 0,11').subscribe((res:any)=>{
      this.proveedores=res;
    });
    this.crearVista(params);
   }
   crearVista(params:any){
    this.request.accion(params).subscribe({next:(res:any)=>{
      
    }});
   }

  ngOnInit(): void {
  }

  buscar(){
    this.sql = "SELECT * FROM proveedor ";
    this.controlador = 0;
    this.cont = 0;
    this.contpag = 1;
    console.log(this.option);
     this.sql = `SELECT * FROM proveedor WHERE `;
    if(this.option == "1"){
      this.sql = `SELECT * FROM proveedor`;
      this.title = 'Todos';
    }else if(this.option == "2"){
      if(this.idProveedor.match("[0-9]+")){
        this.sql += `id = ${this.idProveedor}`;
        this.title = 'ID del proveedor';
    
      }else{
        swal.fire({
          backdrop:true,
          allowOutsideClick: true,
          title: "Error ...",
          text: `Solo se aceptan numeros...`,
          confirmButtonText:'Entendido'
        });
      }
    }else if(this.option == "3"){
      if(this.nomEncargado.match("[|\"\'&]+")){
        swal.fire({
          backdrop:true,
          allowOutsideClick: true,
          title: "Error ...",
          text: `Caracteres inadecuados como: ",',etc...`,
          confirmButtonText:'Entendido'
        });
      }else{
       
        this.sql += `id in(select id from nomcomprov where nomcom like '%${this.nomEncargado}%')`;
        this.title = 'Nombre del proveedor';
      }
    }

    setTimeout(() => {
       this.element?.reinicia(); 
    }, 100);
  }

  change(){
    if(this.option == "1"){
      this.controlador = 1;
    }else if(this.option == "2"){
      this.controlador = 2;
    }else if(this.option == "3"){
      this.controlador = 3;
    }
  }
  next(){
    this.contpag++;
    this.cont+=10;
    this.request.consultas(`${this.sql} LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.proveedores = res;
    });
  }

  previous(){
    this.contpag--;
    this.cont-=10;
    this.request.consultas(`${this.sql} LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.proveedores = res;
    });
  }
  result(res:any){
    this.proveedores = res;
  }
  update(id:number){
    this.router.navigate(['/update-proveedor',id]);
    
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
        let sql=`UPDATE proveedor set status=${stat} where ID=${id}`;
        let body={
          sql:sql,
          table:"proveedor"
        }
        this.request.accion(body).subscribe({next:(res:any)=>{
          if(res.band){
            swal.fire({
              allowOutsideClick: true,
              title: "Exito...",
              text: `${action} de proveedor exitosamente...`,
              confirmButtonText:'Entendido'
            });
          }else{
            swal.fire({
              allowOutsideClick: true,
              title: "Error ...",
              text: `${action} de proveedor exitosamente...`,
              confirmButtonText:'Entendido'
            });
          }
        },
        error:(res:any)=>{
          swal.fire({
            allowOutsideClick: true,
            title: "Error ...",
            text: `${action} de proveedor exitosamente...`,
            confirmButtonText:'Entendido'
          });
        }});
        
      }else{
        swal.fire({
          allowOutsideClick: true,
          title: "Cancelación de acción...",
          text: `${action} de proveedor exitosamente...`,
          confirmButtonText:'Entendido',
          icon:"success"
        });
      }
    });
    
  }

  moreProveedor(id:number){
    this.router.navigate([`/more-proveedor/${id}`]);
  }
  ngAfterViewInit(){
    this.element?.reinicia();
  }
}
