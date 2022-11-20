import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-proveedor',
  templateUrl: './create-proveedor.component.html',
  styleUrls: ['./create-proveedor.component.css']
})
export class CreateProveedorComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  ubicaciones:any[]=[];


  constructor(private request:RequestsService) {

    this.form = new FormGroup({
      nempresa:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      nencargado:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      appat:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      apmat:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      calle:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      numero:new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]+$/)]),
      ubicacion:new FormControl('',[Validators.required]),
      descripcion:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/)]),
    });

    this.request.consultas('SELECT * FROM ubicacion').subscribe((res:any)=>{
      this.ubicaciones = res;
    });
   }

  ngOnInit(): void {
  }

  create(){
    console.log(this.form.value);
    let mysql = `INSERT INTO proveedor(id,id_ubicacion,nempresa,nencargado,appat,apmat,calle,numero,descripcion,email,status,telefono)  VALUES
    (id,${this.form.get('ubicacion')?.value},LOWER('${this.form.get('nempresa')?.value}'),LOWER('${this.form.get('nencargado')?.value}')
    ,LOWER('${this.form.get('appat')?.value}'),LOWER('${this.form.get('apmat')?.value}'),LOWER('${this.form.get('calle')?.value}'),
    ${this.form.get('numero')?.value},'${this.form.get('descripcion')?.value}','${this.form.get('email')?.value}',
    ${1},'${this.form.get('phone')?.value}')`;
    console.log(mysql)
    let obj = {
      sql:mysql,
      table:'proveedor'
    };
    this.request.accion(obj).subscribe({next:(res:any)=>{
      if(res.band){
        swal.fire({
          allowOutsideClick: true,
          title: "Exito...",
          text: "Proveedor agregada exitosamente...",
          confirmButtonText:'Entendido'
        });
        this.form.reset();
      }else{
        swal.fire({
          allowOutsideClick: true,
          title: "Error ...",
          text: "No se pudo agregar el proveedor...",
          confirmButtonText:'Entendido'
        });
      }
    },
  error:(res:any)=>{
    swal.fire({
      allowOutsideClick: true,
      title: "Error ...",
      text: "No se pudo agregar el proveedor...",
      confirmButtonText:'Entendido'
    });
  }});
  }

}
