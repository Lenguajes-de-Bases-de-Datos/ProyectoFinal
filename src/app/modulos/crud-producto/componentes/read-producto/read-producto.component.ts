import { Component, Input, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
import { RequestsService } from 'src/app/services/requests.service';


@Component({
  selector: 'app-read-producto',
  templateUrl: './read-producto.component.html',
  styleUrls: ['./read-producto.component.css']
})
export class ReadProductoComponent implements OnInit {
  option:string="";
  form!:FormGroup;
  //sql:string="SELECT p.ID ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas FROM producto p,categoria c WHERE p.categoria = c.id";
  
  sql:string;
  productos:any[]=[];
  op:string="p.";
  sentencia:string="UPDATE producto SET status = ";
  @Input() cart:boolean = false;
  @Output() ev:EventEmitter<number> = new EventEmitter<number>();
  user:any;
  @ViewChild('paginacion') element?:PaginacionComponent;
  constructor(private request:RequestsService) { 
    this.user = localStorage.getItem('cuenta');
    this.user = JSON.parse(this.user);
    if(this.user.privilegios!='superadmin'){
      this.sql = `select p.id ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas,IFNULL(sp.existencias,'Sin registro') existencias,sp.id_sucursal suc from producto p left join sucursal_producto sp on p.id=sp.id_producto and sp.id_sucursal=${this.user.ID_sucursal} `;
      this.sql += `JOIN categoria c on p.categoria = c.id  WHERE (sp.id_sucursal = ${this.user.ID_sucursal} or sp.existencias is null) `;
    }else{
      this.sql = "select p.id ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas,IFNULL(sp.existencias,'Sin registro') existencias,s.id suc from producto p left join sucursal_producto sp on p.id=sp.id_producto JOIN categoria c on p.categoria = c.id LEFT JOIN sucursal s ON s.id=sp.id_sucursal";
    }
    this.form = new FormGroup({
      texto : new FormControl('',[Validators.required,Validators.pattern("[^\"\'|&]+")]),
      id : new FormControl('',[Validators.required,Validators.pattern("[0-9]+")])
    });
    this.request.consultas(this.sql+' LIMIT 0,11').subscribe((res:any)=>{
      this.productos = res;
    });
  }

  ngOnInit(): void {
  }
  change(){
    if(this.option == "1"){
      
      if(this.user.privilegios!='superadmin'){
        this.sql = `select p.id ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas,IFNULL(sp.existencias,'Sin registro') existencias,sp.id_sucursal suc from producto p left join sucursal_producto sp on p.id=sp.id_producto and sp.id_sucursal=${this.user.ID_sucursal} `;
        this.sql += `JOIN categoria c on p.categoria = c.id LEFT JOIN sucursal s ON s.id=sp.id_sucursal WHERE s.id = ${this.user.ID_sucursal} or sp.existencias is null `;
      }else{
        this.sql = "select p.id ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas,IFNULL(sp.existencias,'Sin registro') existencias,s.id suc from producto p left join sucursal_producto sp on p.id=sp.id_producto JOIN categoria c on p.categoria = c.id LEFT JOIN sucursal s ON s.id=sp.id_sucursal ";
      }
      
      setTimeout(()=>{
        this.element?.reinicia();
      
      },200);
    }else if(this.option == "2"){
        this.form.controls['id'].setValue('123');     
    }else{
      this.form.controls['texto'].setValue('example');     
    
    }
  }
  buscar(){
    if(this.option == "2"){
      this.sql=`SELECT p.ID ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas FROM producto p,categoria c WHERE p.categoria = c.id and lower(concat(p.nombre,c.ncategoria)) like '%${this.form.get('texto')?.value}%'`;
      
      if(this.user.privilegios!='superadmin'){
        this.sql = `select p.id ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas,IFNULL(sp.existencias,'Sin registro') existencias,sp.id_sucursal suc from producto p left join sucursal_producto sp on p.id=sp.id_producto and sp.id_sucursal=${this.user.ID_sucursal} `;
        this.sql += `JOIN categoria c on p.categoria = c.id WHERE (sp.id_sucursal = ${this.user.ID_sucursal} or sp.existencias is null) and lower(concat(p.nombre,c.ncategoria)) like '%${this.form.get('texto')?.value}%'`;
      }else{
        this.sql = `select p.id ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas,IFNULL(sp.existencias,'Sin registro') existencias,s.id suc from producto p left join sucursal_producto sp on p.id=sp.id_producto JOIN categoria c on p.categoria = c.id LEFT JOIN sucursal s ON s.id=sp.id_sucursal WHERE lower(concat(p.nombre,c.ncategoria)) like '%${this.form.get('texto')?.value}%' `;
      }

    }else if(this.option == "3"){
      this.sql=`SELECT p.ID ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas FROM producto p,categoria c WHERE p.categoria = c.id and p.id = ${this.form.get('id')?.value} `;
      if(this.user.privilegios!='superadmin'){
        this.sql = `select p.id ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas,IFNULL(sp.existencias,'Sin registro') existencias,sp.id_sucursal suc from producto p left join sucursal_producto sp on p.id=sp.id_producto and sp.id_sucursal=${this.user.ID_sucursal} `;
        this.sql += `JOIN categoria c on p.categoria = c.id WHERE (sp.id_sucursal = ${this.user.ID_sucursal} or sp.existencias is null) and p.id = ${this.form.get('id')?.value}`;
      }else{
        this.sql = `select p.id ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas,IFNULL(sp.existencias,'Sin registro') existencias,s.id suc from producto p left join sucursal_producto sp on p.id=sp.id_producto JOIN categoria c on p.categoria = c.id LEFT JOIN sucursal s ON s.id=sp.id_sucursal WHERE p.id = ${this.form.get('id')?.value}`;
      }
    }else{

    }
    setTimeout(()=>{
      this.element?.reinicia();
    
    },200);
    
  }
  result(res:any){
    this.productos = res;
  }
  resp(resp:any){
    this.ev.emit(resp);
  }
  cambio(sql:string){
    
    this.sql = sql ;
   
    this.element?.update(1);
   
  }
  update(id:number){
    this.element?.update(1);
  }
}
