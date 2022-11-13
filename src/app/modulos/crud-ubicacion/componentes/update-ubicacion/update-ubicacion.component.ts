import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-ubicacion',
  templateUrl: './update-ubicacion.component.html',
  styleUrls: ['./update-ubicacion.component.css']
})
export class UpdateUbicacionComponent implements OnInit {

  form:FormGroup = new FormGroup({});
  colonias:any[]=[];
  ciudades:any[]=[];
  optionCiudad:any;
  optionColonia:any;

  constructor(private request:RequestsService, private active:ActivatedRoute) {
    this.form = new FormGroup({
      ubinum:new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      estado:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      ciudad:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      colonia:new FormControl('',[Validators.required,Validators.pattern('[^\'\"|&]+')]),
      cp:new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+$/),Validators.minLength(4)])
    });

    /* this.request.consultas('SELECT ciudad FROM ubicacion by group ciudad').subscribe((res:any) => {
      this.ciudades = res;
    });

    this.request.consultas('SELECT colonia FROM ubicacion by group colonia').subscribe((res:any) => {
      this.colonias = res;
    }); */

    this,active.params.subscribe((params:Params)=>{
      if(params['id'] == undefined){

      }else{
        this.form.controls['ubinum'].setValue(""+params['id']);
        this.request.consultas(`SELECT * FROM ubicacion WHERE id = ${params['id']}`).subscribe((res:any) => {
          this.form.controls['estado'].setValue(res[0].estado);
          this.form.controls['ciudad'].setValue(res[0].ciudad);
          this.form.controls['colonia'].setValue(res[0].colonia);
          this.form.controls['cp'].setValue(res[0].cp);
        });
      }
    })
 }

  ngOnInit(): void {
  }

  buscar(){
    let numero = this.form.get('ubinum')?.value;
    if(numero != ""){
      this.request.consultas(`SELECT * FROM ubicacion WHERE id = ${numero}`).subscribe((res:any) => {
        this.form.controls['estado'].setValue(res[0].estado);
        this.form.controls['ciudad'].setValue(res[0].ciudad);
        this.form.controls['colonia'].setValue(res[0].colonia);
        this.form.controls['cp'].setValue(res[0].cp);
      });
    }
  }

  update(){
    let numero = this.form.get('ubinum')?.value;

    let aux = "";
    if(numero != ""){
      aux = "WHERE id = "+numero;
    }
    let mysql = `UPDATE ubicacion SET estado = '${this.form.get('estado')?.value}',ciudad = '${this.form.get('ciudad')?.value}', 
    colonia = '${this.form.get('colonia')?.value}',
    cp = '${this.form.get('cp')?.value}' WHERE id = ${numero}`;
    let obj = {
      sql:mysql,
      table:"ubicacion"
    }

    this.request.accion(obj).subscribe({next:(res:any)=>{
      if(res.band){
        swal.fire({
          allowOutsideClick: true,
          title: "Exito...",
          text: "Ubicación Actualizada exitosamente...",
          confirmButtonText:'Entendido',
          icon:'success'
        });
        this.form.reset();
      }else{
        swal.fire({
          allowOutsideClick: true,
          title: "Error ...",
          text: "No se pudo actualizar a la ubicación...",
          confirmButtonText:'Entendido',
          icon:'error'
        });
      }
    },
  error:(res:any)=>{
    swal.fire({
      allowOutsideClick: true,
      title: "Error ...",
      text: "No se pudo actualizar la ubicación...",
      confirmButtonText:'Entendido',
      icon:'error'
    });
  }});

  }

}
