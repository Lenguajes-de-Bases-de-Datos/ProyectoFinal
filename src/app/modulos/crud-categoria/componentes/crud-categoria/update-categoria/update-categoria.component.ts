import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-update-categoria',
  templateUrl: './update-categoria.component.html',
  styleUrls: ['./update-categoria.component.css']
})
export class UpdateCategoriaComponent implements OnInit {
  form!:FormGroup;
  constructor(private request:RequestsService,private active:ActivatedRoute) { 
    this.form= new FormGroup({
      nombre:new FormControl('',[Validators.required,Validators.pattern('[^|!&\'\"]+')]),
      pasilloInicio:new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      pasilloFin:new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      busnombre:new FormControl('',[Validators.required,Validators.pattern('[^|!&\'\"]+')]),
      activa:new FormControl('',[Validators.required]),
      busnum:new FormControl('',[Validators.required,Validators.pattern('[0-9]+')])
    });

    this.active.params.subscribe((params:Params)=>{
     if(params['id'] == undefined){

     }else{

      this.form.controls['busnum'].setValue(""+params['id']);
      this.request.consultas(`SELECT * FROM categoria WHERE id=${params['id']}`).subscribe((res:any)=>{
        this.form.controls['nombre'].setValue(res[0].ncategoria);
        this.form.controls['pasilloInicio'].setValue(res[0].pasilloInicio);
        this.form.controls['pasilloFin'].setValue(res[0].pasilloFin);
        if(res[0].status==0){
          this.form.controls['activa'].setValue('no');
          
        }else{
          this.form.controls['activa'].setValue('si');
          
        }
      });
    }
    });
  
  }

  ngOnInit(): void {
  }
  buscar(){
    let nombre = this.form.get('busnombre')?.value;
    let numero = this.form.get('busnum')?.value;
    if(nombre == ""){
      this.request.consultas(`SELECT * FROM categoria WHERE id = ${numero}`).subscribe((res:any)=>{
        this.form.controls['nombre'].setValue(res[0].ncategoria);
        this.form.controls['pasilloInicio'].setValue(res[0].pasilloInicio);
        this.form.controls['pasilloFin'].setValue(res[0].pasilloFin);
        if(res[0].status==0){
          this.form.controls['activa'].setValue('no');
          
        }else{
          this.form.controls['activa'].setValue('si');
          
        }
        
      });
    }else{

    }
  }
  update(){
    let nombre = this.form.get('busnombre')?.value;
    let numero = this.form.get('busnum')?.value;
    let aux = "";
    if(nombre==""){
      aux = "WHERE id = "+numero;
    }else{

      aux = "WHERE nombre = "+nombre;
    }
    let status = this.form.get('activa')?.value == "si" ? 1 : 0;
    let mysql = `UPDATE categoria SET ncategoria = '${this.form.get('nombre')?.value}',
     pasilloInicio = ${this.form.get('pasilloInicio')?.value}, pasilloFin = ${this.form.get('pasilloFin')?.value}, 
     status = ${status} ${aux}`;
    let obj = {
      sql:mysql,
      table:"categoria"
    };
    this.request.accion(obj).subscribe({next:(res:any)=>{
      if(res.band){
        swal.fire({
          allowOutsideClick: true,
          title: "Exito...",
          text: "Categoria Actualizada exitosamente...",
          confirmButtonText:'Entendido'
        });
        this.form.reset();
      }else{
        swal.fire({
          allowOutsideClick: true,
          title: "Error ...",
          text: "No se pudo actualizar a la categoria...",
          confirmButtonText:'Entendido'
        });
      }
    },
  error:(res:any)=>{
    swal.fire({
      allowOutsideClick: true,
      title: "Error ...",
      text: "No se pudo actualizar la categoria...",
      confirmButtonText:'Entendido'
    });
  }});

  }
  controlar(num:number){
    
    if(num==1){
      this.form.controls['busnombre'].setValue('');
    }else{

      this.form.controls['busnum'].setValue('');
    }
  }
}
