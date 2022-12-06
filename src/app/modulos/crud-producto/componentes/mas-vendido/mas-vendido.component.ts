import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
@Component({
  selector: 'app-mas-vendido',
  templateUrl: './mas-vendido.component.html',
  styleUrls: ['./mas-vendido.component.css']
})
export class MasVendidoComponent implements OnInit {
  productos:any[]=[];
  option:string="1";
  form:FormGroup;
  user:any;
  sql:string="";
  issuper:boolean=false;
  
  @ViewChild('paginacion') element?:PaginacionComponent;
  constructor() {
    this.sql = `select sum(dv.cantidad) tot,p.id,p.nombre,c.ncategoria cat,p.precioUnitario precio from detalle_venta dv,producto p,venta v,usuario u,categoria c WHERE dv.id_producto=p.id and dv.id_venta=v.id and v.id_usuario=u.id and p.categoria=c.id`;
    this.user = localStorage.getItem('cuenta');
    this.user = JSON.parse(this.user);
    this.form = new FormGroup({
      texto : new FormControl('',[Validators.required,Validators.pattern("[^|\"\'&]+")]),
      id : new FormControl('',[Validators.required,Validators.pattern("[0-9]+")]),
      fechaini : new FormControl(moment().subtract(7,'day').format('YYYY-MM-DD'),[Validators.required]),
      fechafin : new FormControl(moment().format('YYYY-MM-DD'),[Validators.required]),
      
    });
    if(this.user.privilegios == "superadmin"){
      this.issuper = true;
    }else{
      this.sql += ` and u.id_sucursal=${this.user.ID_sucursal}`
    }
    
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.buscar();
  }
  buscar(){
    if(this.option == "1"){

    }else if(this.option == "2"){
      this.sql = `select sum(dv.cantidad) tot,p.id,p.nombre,c.ncategoria cat,p.precioUnitario precio from detalle_venta dv,producto p,venta v,usuario u,categoria c WHERE dv.id_producto=p.id and dv.id_venta=v.id and v.id_usuario=u.id and p.categoria=c.id and concat(p.nombre,c.ncategoria) LIKE '%${this.form.get('texto')?.value}%' and DATE(v.fechav) BETWEEN '${this.form.get('fechaini')?.value}' AND '${this.form.get('fechafin')?.value}'`;
     
    }else if(this.option == "3"){
      this.sql = `select sum(dv.cantidad) tot,p.id,p.nombre,c.ncategoria cat,p.precioUnitario precio from detalle_venta dv,producto p,venta v,usuario u,categoria c WHERE dv.id_producto=p.id and dv.id_venta=v.id and v.id_usuario=u.id and p.categoria=c.id and p.id = ${this.form.get('id')?.value} and DATE(v.fechav) BETWEEN '${this.form.get('fechaini')?.value}' AND '${this.form.get('fechafin')?.value}'`;
      
    }else if(this.option == "4"){
      this.sql = `select sum(dv.cantidad) tot,p.id,p.nombre,c.ncategoria cat,p.precioUnitario precio from detalle_venta dv,producto p,venta v,usuario u,categoria c WHERE dv.id_producto=p.id and dv.id_venta=v.id and v.id_usuario=u.id and p.categoria=c.id and DATE(v.fechav) BETWEEN '${this.form.get('fechaini')?.value}' AND '${this.form.get('fechafin')?.value}'`;
     
    }
    if(this.issuper){

    }else{
      this.sql += ` and u.id_sucursal=${this.user.ID_sucursal}`;
    }
    this.sql += ` GROUP BY p.id ORDER BY tot DESC`;
    setTimeout(()=>{
      this.element?.reinicia();
    
    },200);
  }
  change(){
    this.form.controls['texto'].setValue('example');
    this.form.controls['id'].setValue('1');
    this.form.controls['fechaini'].setValue(moment().subtract(7,'day').format('YYYY-MM-DD'));
    this.form.controls['fechafin'].setValue(moment().format('YYYY-MM-DD'));
    
    if(this.option == "1"){
      this.sql = `select sum(dv.cantidad) tot,p.id,p.nombre,c.ncategoria cat,p.precioUnitario precio from detalle_venta dv,producto p,venta v,usuario u,categoria c WHERE dv.id_producto=p.id and dv.id_venta=v.id and v.id_usuario=u.id and p.categoria=c.id`;
      this.buscar();
    }else if(this.option == "2"){
       this.form.controls['texto'].setValue('');
    }else if(this.option == "3"){
       this.form.controls['id'].setValue('');
    }else if(this.option == "4"){
      this.form.controls['fechaini'].setValue('');
      this.form.controls['fechafin'].setValue('');
    }
    
  }
  result(array:any){
    this.productos = array;
  }


  // select count(*) tot,p.id,p.nombre,c.ncategoria cat,p.precioUnitario precio from detalle_venta dv,producto p,venta v,usuario u,categoria c WHERE dv.id_producto=p.id and dv.id_venta=v.id and v.id_usuario=u.id and p.categoria=c.id and u.id_sucursal=2 GROUP BY p.id ORDER BY tot DESC;
}
