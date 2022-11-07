import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {
  form!:FormGroup;
  actualiza:boolean = false;
  constructor() {
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
}
