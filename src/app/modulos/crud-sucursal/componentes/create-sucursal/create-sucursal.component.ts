import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-create-sucursal',
  templateUrl: './create-sucursal.component.html',
  styleUrls: ['./create-sucursal.component.css']
})
export class CreateSucursalComponent implements OnInit {
  form!:FormGroup;
  ubicaciones:any[]=[];
  constructor(private request:RequestsService) { 

    this.form = new FormGroup({
      ubicacion : new FormControl('',[Validators.required,Validators.pattern('[^-]+')]),
      calle : new FormControl('',[Validators.required,Validators.pattern('[^!|&\"\'()]+')]),
      numero : new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      telefono : new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/)]),
      email : new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]+$/)]),
      hap : new FormControl('',[Validators.required,Validators.pattern('([0-9]{1,2}:){2}[0-9]{1,2}')]),
      hci : new FormControl('',[Validators.required,Validators.pattern('([0-9]{1,2}:){2}[0-9]{1,2}')]) 

    });

    this.request.consultas('SELECT * FROM ubicacion').subscribe((res:any)=>{
      this.ubicaciones = res;
    });
  }

  ngOnInit(): void {
  }
 enviar(){
  let sql = `INSERT INTO sucursal VALUES 
  (id,${this.form.get('ubicacion')?.value.charAt(0)},'${this.form.get('calle')?.value.toLowerCase()}',${this.form.get('numero')?.value},'${this.form.get('telefono')?.value}',
  '${this.form.get('email')?.value}',1,'${this.form.get('hap')?.value}','${this.form.get('hci')?.value}')`;
  let body = {
    sql : sql,
    table : 'sucursal' 
  }
  this.request.accion(body).subscribe({next:(res:any)=>{
    if(res.band){
      swal.fire({
        allowOutsideClick: true,
        title: "Exito...",
        text: "Sucursal agregada exitosamente...",
        confirmButtonText:'Entendido',
        icon:'success'
      });
  }else{
    swal.fire({
      allowOutsideClick: true,
      title: "Error...",
      text: "No se realizo la operación...",
      confirmButtonText:'Entendido',
      icon:'error'
    });
  }
  },
  error:(res:any)=>{
    swal.fire({
      allowOutsideClick: true,
      title: "Error...",
      text: "No se realizo la operación...",
      confirmButtonText:'Entendido',
      icon:'error'
    });
  }});
 }
 formatear(event:any){
  let valor = this.form.get('telefono')?.value;
   
  let tamanio = valor.length;
  console.log("event: "+event.keyCode)
  if(event.keyCode == 8){
    
  }else{
  if(tamanio==3 || tamanio==7 ){
    console.log("true")
    let aux = this.form.get('telefono')?.value;
    this.form.controls['telefono'].setValue(aux+"-");
    
  }else if(tamanio==10 ){
    let aux = this.form.get('telefono')?.value;
    this.form.controls['telefono'].setValue(aux+"-");
    
    
  }
  }

 }
}
