import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-proveedor',
  templateUrl: './update-proveedor.component.html',
  styleUrls: ['./update-proveedor.component.css']
})
export class UpdateProveedorComponent implements OnInit {

  form:FormGroup=new FormGroup({});
  ubicaciones:any[]=[];
  proveedor:any;

  constructor(private request:RequestsService, private active:ActivatedRoute) {

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

    this.active.params.subscribe((params:Params)=>{
      if(params['id'] == undefined){

      }else{
        this.request.consultas(`SELECT * FROM proveedor where id=${params['id']}`).subscribe((res:any)=>{
          this.form.controls['nempresa'].setValue(res[0].nempresa);
          this.form.controls['nencargado'].setValue(res[0].nempresa);
          this.form.controls['appat'].setValue(res[0].appat);
          this.form.controls['apmat'].setValue(res[0].appat);
          this.form.controls['calle'].setValue(res[0].calle);
          this.form.controls['numero'].setValue(res[0].numero);
          this.form.controls['email'].setValue(res(0).email);
          this.form.controls['ubicacion'].setValue(res[0].ubicacion);
          this.form.controls['descripcion'].setValue(res[0].descripcion);
          this.form.controls['phone'].setValue(res[0].telefono);
        });

      }
    });
   }

  ngOnInit(): void {
  }

  create(){
    console.log(this.form.value);
    /*let mysql = `INSERT INTO proveedor(id,id_ubicacion,nempresa,nencargado,appat,apmat,calle,numero,descripcion,email,status,telefono)  VALUES
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
  }});*/
  }

}
