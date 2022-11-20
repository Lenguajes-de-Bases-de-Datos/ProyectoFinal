import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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
  actualiza:boolean=false;
  id:number=0;
  constructor(private request:RequestsService,private active:ActivatedRoute) { 
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

    this.active.params.subscribe((params:Params)=>{

      if(params['id'] == undefined){

      }else{
        this.actualiza = true;
        this.id = params['id'];
        
        this.request.consultas
        (`SELECT s.id,s.ID_ubicacion "ID_ubicacion",s.calle,s.numero,s.telefono,s.email,s.horarioap,s.horariocierre FROM sucursal s,ubicacion u
        WHERE s.ID_ubicacion=u.id and s.id = ${this.id}`)
        .subscribe((res:any)=>{
          this.form.controls['ubicacion'].setValue(`${res[0].ID_ubicacion}`);
          this.form.controls['calle'].setValue(`${res[0].calle}`);
          this.form.controls['numero'].setValue(`${res[0].numero}`);
          this.form.controls['telefono'].setValue(`${res[0].telefono}`);
          this.form.controls['email'].setValue(`${res[0].email}`);
          this.form.controls['hap'].setValue(`${res[0].horarioap}`);
          this.form.controls['hci'].setValue(`${res[0].horariocierre}`);
          
          
          
        });
      }

    });
 



  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    
  }
 enviar(){
  let sql = `INSERT INTO sucursal VALUES 
  (id,${this.form.get('ubicacion')?.value},'${this.form.get('calle')?.value.toLowerCase()}',${this.form.get('numero')?.value},'${this.form.get('telefono')?.value}',
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
      this.form.reset();
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

 update(){
  let sql = `UPDATE sucursal SET ID_ubicacion = ${this.form.get('ubicacion')?.value},calle = '${this.form.get('calle')?.value}',numero = ${this.form.get('numero')?.value},
  telefono = '${this.form.get('telefono')?.value}',email='${this.form.get('email')?.value}',horarioap='${this.form.get('hap')?.value}',horariocierre='${this.form.get('hci')?.value}'
   WHERE id = ${this.id}`;
   let body = {
    sql:sql,
    table:"sucursal"
   }
   this.request.accion(body).subscribe(
    {next:(res:any)=>{
      if(res.band){
        swal.fire({
          allowOutsideClick: true,
          title: "Exito...",
          text: "Sucursal Actualizada exitosamente...",
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
    }}
   );

 }

 formatear(event:any){
  let valor = this.form.get('telefono')?.value;
   
  let tamanio = valor.length;
  
  if(event.keyCode == 8){
    
  }else{
  if(tamanio==3 || tamanio==7 ){
    
    let aux = this.form.get('telefono')?.value;
    this.form.controls['telefono'].setValue(aux+"-");
    
  }else if(tamanio==10 ){
    let aux = this.form.get('telefono')?.value;
    this.form.controls['telefono'].setValue(aux+"-");
    
    
  }
  }

 }
}
