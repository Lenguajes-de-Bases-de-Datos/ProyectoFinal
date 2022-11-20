import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-create-categoria',
  templateUrl: './create-categoria.component.html',
  styleUrls: ['./create-categoria.component.css']
})
export class CreateCategoriaComponent implements OnInit {
  form!:FormGroup;
  constructor(private request:RequestsService) {
    
    this.form= new FormGroup({
      nombre:new FormControl('',[Validators.required,Validators.pattern('[^|!&\'\"]+')]),
      pasilloInicio:new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      pasilloFin:new FormControl('',[Validators.required,Validators.pattern('[0-9]+')])
    });
   }

  ngOnInit(): void {
  }
  create(){

    let mysql = `INSERT INTO categoria(id,ncategoria,pasilloInicio,pasilloFin)  VALUES
    (id,LOWER('${this.form.get('nombre')?.value}'),${this.form.get('pasilloInicio')?.value},
    ${this.form.get('pasilloFin')?.value})`;
    let obj = {
      sql:mysql,
      table:'categoria'
    };
    this.request.accion(obj).subscribe({next:(res:any)=>{
      if(res.band){
        swal.fire({
          allowOutsideClick: true,
          title: "Exito...",
          text: "Categoria agregada exitosamente...",
          confirmButtonText:'Entendido'
        });
        this.form.reset();
      }else{
        swal.fire({
          allowOutsideClick: true,
          title: "Error ...",
          text: "No se pudo agregar a la categoria...",
          confirmButtonText:'Entendido'
        });
      }
    },
  error:(res:any)=>{
    swal.fire({
      allowOutsideClick: true,
      title: "Error ...",
      text: "No se pudo agregar la categoria...",
      confirmButtonText:'Entendido'
    });
  }});
  }
}
