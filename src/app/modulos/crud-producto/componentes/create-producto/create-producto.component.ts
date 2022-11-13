import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../../../../services/requests.service';
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
  constructor(private request:RequestsService) {
    this.form = new FormGroup({
      categoria : new FormControl('',[Validators.required]),
      nombre : new FormControl('',[Validators.required,Validators.pattern('[^\"\'\`|!&()]+')]),
      precio : new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      contenido: new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      descripcion: new FormControl('',[Validators.pattern('[^\"\'\`|&!]+')])
    });
   }

  ngOnInit(): void {
  }
  alta(){
    let sql = `INSERT INTO producto`;


  }
  handleFiles(files:any){
    const myfile:File = files.target.files[0];
    console.log("file: "+myfile);
    if (myfile) {

      let fileName = myfile.name;
      const formData = new FormData();
      formData.append("thumbnail", myfile);
      let path = URL.createObjectURL(myfile)
      console.log("formData: "+path);
      
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
      console.log("formData",formData);

    }
    //call service
    this.request.uploadFile(formData).subscribe((res:any)=>{
      console.log('Response:',res);
    });
    this.bandImg=false;
  }
}
