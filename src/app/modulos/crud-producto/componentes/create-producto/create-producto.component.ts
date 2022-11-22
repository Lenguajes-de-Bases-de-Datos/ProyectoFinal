import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../../../../services/requests.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {
  form!:FormGroup;
  actualiza:boolean = false;
  uploadedFiles!: Array<File>;
  bandImg:boolean=false;
  name:string="";
  pieza:any=1;
  categorias:any[]=[];

  constructor(private request:RequestsService) {
    this.form = new FormGroup({
      categoria : new FormControl('',[Validators.required]),
      nombre : new FormControl('',[Validators.required,Validators.pattern('[^\"\'\`|!&()]+')]),
      precio : new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      contenido: new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      descripcion: new FormControl('',[Validators.pattern('[^\"\'\`|&!]+')]),
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

  alta(){
    let mysql = `INSERT INTO producto (ID,categoria,nombre,descripcion,precioUnitario,
      status,imagen,piezas,pieza) values (ID,${this.form.get('categoria')?.value},
      '${this.form.get('nombre')?.value}','${this.form.get('descripcion')?.value}',
      ${this.form.get('precio')?.value},${1},'${this.name}',${this.form.get('contenido')?.value},
      ${this.pieza})`;

      let obj = {
        sql:mysql,
        table:'producto'
      };

      this.request.accion(obj).subscribe({next:(res:any)=>{
        if(res.band){
          swal.fire({
            allowOutsideClick: true,
            title: "Exito...",
            text: "Producto agregada exitosamente...",
            confirmButtonText:'Entendido'
          });
          this.form.reset();
        }else{
          swal.fire({
            allowOutsideClick: true,
            title: "Error ...",
            text: "No se pudo agregar el producto...",
            confirmButtonText:'Entendido'
          });
        }
      },
    error:(res:any)=>{
      swal.fire({
        allowOutsideClick: true,
        title: "Error ...",
        text: "No se pudo agregar el producto...",
        confirmButtonText:'Entendido'
      });
    }});

  }
  handleFiles(files:any){
    const myfile:File = files.target.files[0];
    
    if (myfile) {

      let fileName = myfile.name;
      const formData = new FormData();
      formData.append("thumbnail", myfile);
      let path = URL.createObjectURL(myfile)
     
      
  }

  }
  onFileChange(e:any){
    this.uploadedFiles=e.target.files;
    this.name=this.uploadedFiles[0].name;
    this.bandImg=true;
  }
  onUpload(){
    let formData = new FormData();

    for(let i=0; i<this.uploadedFiles.length; i++){
      formData.append('uploads[]',this.uploadedFiles[i],this.uploadedFiles[i].name);
     

    }
    //call service
    this.request.uploadFile(formData).subscribe((res:any)=>{
   
    });
    this.bandImg=false;
    console.log(this.form);
    this.alta();
  }
}
