import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-update-categoria',
  templateUrl: './update-categoria.component.html',
  styleUrls: ['./update-categoria.component.css']
})
export class UpdateCategoriaComponent implements OnInit {
  form!:FormGroup;
  constructor(private request:RequestsService) { 
    this.form= new FormGroup({
      nombre:new FormControl('',[Validators.required,Validators.pattern('[^|!&\'\"]+')]),
      pasilloInicio:new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      pasilloFin:new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      busnombre:new FormControl('',[Validators.pattern('[^|!&\'\"]+')]),
      busnum:new FormControl('',[Validators.pattern('[0-9]+')])
    });
  }

  ngOnInit(): void {
  }
  buscar(){
    let nombre = this.form.get('busnombre')?.value;
    let numero = this.form.get('busnum')?.value;
    if(nombre == ""){
      
    }else{

    }
  }
  update(){


    let obj = {
      nombre:this.form.get('nombre')?.value,
      pasilloInicio:this.form.get('pasilloInicio')?.value,
      pasilloFin:this.form.get('pasilloFin')?.value
    };
    this.request.insert('/insertar-categoria',obj).subscribe({next:(res:any)=>{
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
      text: "No se pudo agregar al usuario...",
      confirmButtonText:'Entendido'
    });
  }});

  }
}
