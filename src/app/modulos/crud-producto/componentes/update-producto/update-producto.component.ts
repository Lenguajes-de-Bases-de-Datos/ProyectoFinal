import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  form!:FormGroup;
  actualiza:boolean = false;
  uploadedFiles!: Array<File>;
  bandImg:boolean=false;
  name:string="";
  pieza:any=1;
  categorias:any[]=[];
  id_producto:any;
  img:any;
  bandImgAct:boolean=false;
  constructor(private request:RequestsService,private active:ActivatedRoute, private router:Router) {
    this.form = new FormGroup({
      categoria : new FormControl('',[Validators.required]),
      nombre : new FormControl('',[Validators.required,Validators.pattern('[^\"\'\`|!&()]+')]),
      precio : new FormControl('',[Validators.required,Validators.pattern('[0-9]+\.\[0-9]+')]),
      contenido: new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      descripcion: new FormControl('',[Validators.pattern('[^\"\'\`|&!]+')]),
    });
    
    this.active.params.subscribe((params:Params)=>{
      if(params['id'] == undefined){

      }else{
        this.id_producto=params['id'];
        console.log(this.id_producto);
        this.request.consultas(`SELECT * FROM producto where ID=${params['id']}`).subscribe((res:any)=>{
          this.form.controls['categoria'].setValue(res[0].categoria);
          this.form.controls['nombre'].setValue(res[0].nombre);
          this.form.controls['precio'].setValue(res[0].precioUnitario);
          this.form.controls['contenido'].setValue(res[0].piezas);
          this.form.controls['descripcion'].setValue(res[0].descripcion);
          this.img=res[0].imagen;
          this.name=this.img;
        });
        console.log(this.form.value);

      }
    });

    this.request.consultas('SELECT * FROM categoria WHERE status=1').subscribe((res:any)=>{
      this.categorias = res;
    });

   }

   filtro(num:number){
      if(num == 0){
        this.pieza=0;
      }else if(num == 1){
        this.pieza=1;
      }
   }

  ngOnInit(): void {
  }

  actualizar(){
    
      let mysql = `UPDATE producto SET categoria=${this.form.get('categoria')?.value},nombre='${this.form.get('nombre')?.value}',descripcion='${this.form.get('descripcion')?.value}',
      precioUnitario=${this.form.get('precio')?.value},piezas=${this.form.get('contenido')?.value},imagen='${this.name}',pieza=${this.pieza} where ID=${this.id_producto}`;

      let obj = {
        sql:mysql,
        table:'producto'
      };

      this.request.accion(obj).subscribe({next:(res:any)=>{
        if(res.band){
          swal.fire({
            allowOutsideClick: true,
            title: "Exito...",
            text: "Producto se actualizo exitosamente...",
            confirmButtonText:'Entendido'
          });
          this.form.reset();
          this.router.navigate(['/read-producto']);
        }else{
          swal.fire({
            allowOutsideClick: true,
            title: "Error ...",
            text: "No se pudo actualizar el producto...",
            confirmButtonText:'Entendido'
          });
        }
      },
    error:(res:any)=>{
      swal.fire({
        allowOutsideClick: true,
        title: "Error ...",
        text: "No se pudo actualizar el producto...",
        confirmButtonText:'Entendido'
      });
    }});

  }
  onFileChange(e:any){
    this.uploadedFiles=e.target.files;
    this.name=this.uploadedFiles[0].name;
    this.bandImg=true;
    this.bandImgAct=true;
  }
  onUpload(){
    let formData = new FormData();

    for(let i=0; i<this.uploadedFiles.length; i++){
      formData.append('uploads[]',this.uploadedFiles[i],this.uploadedFiles[i].name);
     

    }
    //call service
    
    if(this.bandImgAct){
      this.request.borrarImg(this.img).subscribe((res:any)=>{
        if(res.band){
          this.funcionGuardar(formData);
        }
      });
    }
    this.bandImg=false;
    console.log("Valores del form");
    console.log(this.form.value);
    console.log(this.img);
    this.actualizar();
  }
  funcionGuardar(formData:FormData){
    this.request.uploadFile(formData).subscribe((res:any)=>{
   
    });
  }

}
