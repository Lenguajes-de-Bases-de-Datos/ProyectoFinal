import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mas-vendido',
  templateUrl: './mas-vendido.component.html',
  styleUrls: ['./mas-vendido.component.css']
})
export class MasVendidoComponent implements OnInit {
  productos:any[]=[];
  option:string="";
  form:FormGroup;
  user:any;
  sql:string="";
  constructor() {
    this.user = localStorage.getItem('cuenta');
    this.user = JSON.parse(this.user);
    this.form = new FormGroup({
      texto : new FormControl('',[Validators.required,Validators.pattern("[^|\"\'&]+")]),
      id : new FormControl('',[Validators.required,Validators.pattern("[0-9]+")]),
      fechaini : new FormControl('',[Validators.required]),
      fechafin : new FormControl('',[Validators.required]),
      
    });
   }

  ngOnInit(): void {
  }
  buscar(){

  }
  change(){

  }
  result(array:any){

  }


  // select count(*) tot,p.id,p.nombre,c.ncategoria cat,p.precioUnitario precio from detalle_venta dv,producto p,venta v,usuario u,categoria c WHERE dv.id_producto=p.id and dv.id_venta=v.id and v.id_usuario=u.id and p.categoria=c.id and u.id_sucursal=2 GROUP BY p.id ORDER BY tot DESC;
}
