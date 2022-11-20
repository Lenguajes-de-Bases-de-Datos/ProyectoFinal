import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-compra',
  templateUrl: './create-compra.component.html',
  styleUrls: ['./create-compra.component.css']
})
export class CreateCompraComponent implements OnInit {
  option:string="";
  form!:FormGroup;
  prod:any[]=[];
  in!:FormGroup;
  constructor() { 
    this.form = new FormGroup({
      texto : new FormControl('',[Validators.required]),
      id : new FormControl('',[Validators.required])
    });
    this.in = new FormGroup({
      cantidad : new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      descripcion : new FormControl('',[Validators.required,Validators.pattern('[^\'\"!&|]+')])
    });
  }

  ngOnInit(): void {
  }
change(){

}
buscar(){

}
  recep(obj:any){ 
    let i = this.prod.findIndex(p=>p.ID === obj.ID);
    console.log(i)
    if(i != -1){
      this.prod[i].cant++;
     }else{
      this.prod.push({
        ID:obj.ID,
        nombre:obj.nombre,
        cant:1
      });
    }
  } 
}
