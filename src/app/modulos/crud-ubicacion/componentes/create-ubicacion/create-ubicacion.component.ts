import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-ubicacion',
  templateUrl: './create-ubicacion.component.html',
  styleUrls: ['./create-ubicacion.component.css']
})
export class CreateUbicacionComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  ubicaciones:any[]=[];

  constructor(private request:RequestsService) {
    this.form = new FormGroup({
      estado:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      ciudad:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      colonia:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      cp:new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+$/),Validators.minLength(4)])
    });
   }

  ngOnInit(): void {
  }

  send(){
    let mysql = `INSERT INTO ubicacion (ID,estado,ciudad,colonia,cp) VALUES (ID,'${this.form.get('estado')?.value}',
    '${this.form.get('ciudad')?.value}','${this.form.get('colonia')?.value}',${this.form.get('cp')?.value})`;

    let params = {
      sql:mysql,
      table:'ubicacion'
    };
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
    
    
    let sql=`SELECT * FROM ubicacion WHERE cp=${this.form.get('cp')?.value}`;
    this.request.consultas(sql).subscribe((res:any)=>{
      this.ubicaciones = res;
      if(this.ubicaciones.length==0){
        this.insertarUbicacion(params);
      }else{
        swal.fire({
          allowOutsideClick:true,
          title:'Error',
          text:'Ubicación con el mismo Código Postal',
          icon:'error',
          confirmButtonText:'Entendido'
        });
      }
      swal.close();
    });
  }
  insertarUbicacion(params:any){
    this.request.accion(params).subscribe({next:(res:any)=>{
      if(res.band){
        swal.fire({
          allowOutsideClick: true,
          title: "Exito...",
          text: "Usuario agregado exitosamente...",
          confirmButtonText:'Entendido',
          icon:'success'
        });
        this.form.reset();
      }
     },
     error:(res:any)=>{
      swal.fire({
        allowOutsideClick: true,
        title: "Error ...",
        text: "No se pudo agregar al usuario...",
        icon:'error',
        confirmButtonText:'Entendido'
      });
    }});
  }
}
