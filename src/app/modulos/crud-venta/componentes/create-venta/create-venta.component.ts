import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-create-venta',
  templateUrl: './create-venta.component.html',
  styleUrls: ['./create-venta.component.css']
})
export class CreateVentaComponent implements OnInit {
  prod:any[]=[];
  prods!:Observable<any>;
  total:number=0;
  sql:string="";
  desc:string="";
  option:string="";
  form:FormGroup;
  @ViewChild('paginacion') element?:PaginacionComponent;
  constructor(private request:RequestsService) { 
    let user:any = localStorage.getItem('cuenta');
    user = JSON.parse(user);
   
      this.sql = "select p.id,p.nombre,c.ncategoria,sp.existencias,p.precioUnitario ";
      this.sql += `FROM producto p,sucursal_producto sp,categoria c WHERE p.id=sp.id_producto and p.categoria=c.id and sp.id_sucursal=${user.ID_sucursal}`;
      this.prods = this.request.consultas(this.sql).pipe(map((data:any)=>data));
      this.form = new FormGroup({
        texto: new FormControl('1',[Validators.required,Validators.pattern('[^\'\"!&|]+')]),
        id: new FormControl('1',[Validators.required,Validators.pattern('[0-9]+')])
      }); 
  }
  actTotal(ev:any,i:number){
    
    if((ev.keyCode >=96 && ev.keyCode <=105 || ev.keyCode>=48 && ev.keyCode <= 57) && this.prod[i].cant.match("[0-9]+")){
      if(this.prod[i].existencias > this.prod[i].cant){
        this.total -= this.prod[i].tot;
        this.prod[i].tot = this.prod[i].precio*this.prod[i].cant;
        this.total += this.prod[i].tot;
      }else{
        this.total -= this.prod[i].tot;
        this.prod[i].tot = this.prod[i].precio*this.prod[i].existencias;
        this.total += this.prod[i].tot;
        this.prod[i].cant = this.prod[i].existencias;
      }
    }else if(ev.keyCode != 8){
      this.prod[i].cant = 1;
      this.total -= this.prod[i].tot;
      this.prod[i].tot = this.prod[i].precio*this.prod[i].cant;
      this.total += this.prod[i].tot;
    
    }
  }
  agregar(obj:any){
    let i = this.prod.findIndex((p:any)=>p.id===obj.id);
    if(i!=-1){
      
    console.log("existencias: "+this.prod[i].existencias)
      if(this.prod[i].existencias>this.prod[i].cant){
        this.prod[i].cant++;
        this.prod[i].tot = this.prod[i].tot + this.prod[i].precio;
        this.total += this.prod[i].precio;
      }
    }else{
      if(obj.existencias != 0){
        this.prod.push({
          id:obj.id,
          nombre:obj.nombre,
          existencias:obj.existencias,
          categoria:obj.ncategoria,
          cant:1,
          precio:obj.precioUnitario,
          tot:obj.precioUnitario
        });
        this.total += obj.precioUnitario;
      }
    }
  }
  buscar(){
    let user:any = localStorage.getItem('cuenta');
    user = JSON.parse(user);
   
    if(this.option=="2"){
      this.sql = "select p.id,p.nombre,c.ncategoria,sp.existencias,p.precioUnitario ";
      this.sql += `FROM producto p,sucursal_producto sp,categoria c WHERE p.id=sp.id_producto and p.categoria=c.id and sp.id_sucursal=${user.ID_sucursal} and concat(p.nombre,c.ncategoria) like '%${this.form.get('texto')?.value}%'`;
     
    }else if(this.option=="3"){
      this.sql = "select p.id,p.nombre,c.ncategoria,sp.existencias,p.precioUnitario ";
      this.sql += `FROM producto p,sucursal_producto sp,categoria c WHERE p.id=sp.id_producto and p.categoria=c.id and sp.id_sucursal=${user.ID_sucursal} and p.id = ${this.form.get('id')?.value}`;
     
    }else{
      this.sql = "select p.id,p.nombre,c.ncategoria,sp.existencias,p.precioUnitario ";
      this.sql += `FROM producto p,sucursal_producto sp,categoria c WHERE p.id=sp.id_producto and p.categoria=c.id and sp.id_sucursal=${user.ID_sucursal} and concat(p.nombre,c.ncategoria) like '%${this.form.get('texto')?.value}%'`;
   
      this.form.controls['id'].setValue('1');
      this.form.controls['texto'].setValue('1');
    }
    
    this.element?.update(1);
  }
  change(){
    if(this.option=="2"){
      this.form.controls['id'].setValue('1');
      this.form.controls['texto'].setValue('');
    }else if(this.option=="3"){
      this.form.controls['id'].setValue('');
      this.form.controls['texto'].setValue('1');
    }else{
      this.form.controls['id'].setValue('1');
      this.form.controls['texto'].setValue('1');
    }
  }
  deleteOne(i:any){
    this.total -= this.prod[i].tot;
    this.prod.splice(i,1);
    
  }
  isEmptyArray():boolean{
    if(this.prod.length>0){
      return false;
    }else{
      return true;
    }
  }
  ngOnInit(): void {
  }
  venta(){

    if(this.desc.match("[\"\'|&]+")){
      swal.fire({
        backdrop: true, 
        allowOutsideClick: true,
        title: "Texto incorrecto en observaciones...",
        text: "No se permiten caracteres como \", ', |,etc...",
        confirmButtonText:'Entendido'
      });
    }else{
      let user:any = localStorage.getItem('cuenta');
      let last_id = 0;
      user = JSON.parse(user);
      let sql = `INSERT INTO venta VALUES(id,${user.ID},1,now(),${this.total},'${this.desc}')`;
      let body = {
        sql:sql,
        table:"venta"
      }
      this.request.accion(body).subscribe((res:any)=>{
        if(res.band){
          this.request.consultas("SELECT LAST_INSERT_ID() id").subscribe((res:any)=>{
            last_id = res[0].id;
            this.detalle_venta(last_id);
          });
        }
      });
   }
  }
  detalle_venta(id:number){
    let sql2="INSERT INTO detalle_venta VALUES";
    for(let i = 0; i<this.prod.length; i++){
      sql2 += `(${this.prod[i].id},${id},${this.prod[i].precio},${this.prod[i].cant})`;
      if(i == this.prod.length-1){

      }else{
        sql2 += ",";
      }
    }
    let body = {
      sql:sql2,
      table:"detalle_venta"
    };
    this.request.accion(body).subscribe((res:any)=>{
      if(res.band){
        swal.fire({
          allowOutsideClick: true,
          title: "Exito...",
          text: "Venta realizada exitosamente...",
          confirmButtonText:'Entendido'
        });
        this.prod = [];
        this.total = 0;
        this.prods = this.request.consultas(this.sql).pipe(map((data:any)=>data));
      }
    });
  }
  result(ev:any){
    this.prods = of(ev);
  }
  salir(i:any){
    if(this.prod[i].cant == ""){
      this.prod[i].cant = 1;
      this.total -= this.prod[i].tot;
      this.prod[i].tot = this.prod[i].precio*this.prod[i].cant;
      this.total += this.prod[i].tot;
    }
  }
}
