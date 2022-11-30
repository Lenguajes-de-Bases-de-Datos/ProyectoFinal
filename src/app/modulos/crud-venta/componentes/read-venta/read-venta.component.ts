import { identifierName } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
@Component({
  selector: 'app-read-venta',
  templateUrl: './read-venta.component.html',
  styleUrls: ['./read-venta.component.css']
})
export class ReadVentaComponent implements OnInit {
  ventas:any[]=[];
  sql:string="";
  sentencia:string="UPDATE venta SET status = ";
  total:number=0;
  option:string = "";
  form:FormGroup;
  user:any;
  issuper:boolean=false;
  @ViewChild('paginacion') element?:PaginacionComponent;
  constructor(private request:RequestsService,private router:Router) { 
    let sqltot="";
    this.form = new FormGroup({
      id: new FormControl('1',[Validators.required,Validators.pattern('[0-9]+')]),
      name: new FormControl('example',[Validators.required,Validators.pattern('[^|\'\"&]+')]),
      fechaini: new FormControl('example',[Validators.required]),
      fechafin: new FormControl('example',[Validators.required]),
      sucursal: new FormControl('1',[Validators.required,Validators.pattern("[0-9]+")]) 
    });
    
    this.user = localStorage.getItem('cuenta');
    this.user = JSON.parse(this.user);
    if(this.user.privilegios == 'superadmin'){
      this.sql = `SELECT v.id,concat(u.nombre,' ',u.appat,' ',u.apmat) usuario,v.fechav fecha,v.total,v.descripcion,v.status,u.id_sucursal suc `;
      this.sql += `FROM venta v,usuario u WHERE v.id_usuario=u.id`;
      sqltot = `select sum(v.total) total from venta v`;
     
      this.issuper = true;
    }else{
      sqltot = `select sum(v.total) total from venta v,usuario u WHERE v.ID_usuario=u.id and u.ID_sucursal=${this.user.ID_sucursal} GROUP BY u.ID_sucursal`;
      this.sql = `SELECT v.id,concat(u.nombre,' ',u.appat,' ',u.apmat) usuario,v.fechav fecha,v.total,v.descripcion,v.status,u.id_sucursal suc  `;
      this.sql += `FROM venta v,usuario u WHERE v.id_usuario=u.id and u.id_sucursal=${this.user.ID_sucursal}`;
    }
    this.request.consultas(this.sql).subscribe((res:any)=>{
      this.ventas = res;
    });
    
    this.request.consultas(sqltot).subscribe((res:any)=>{
      this.total = res[0].total;
    });

  }
  buscar(){
    let sqltot="";
    switch(this.option){
      case "1":
        this.sql = `SELECT v.id,concat(u.nombre,' ',u.appat,' ',u.apmat) usuario,v.fechav fecha,v.total,v.descripcion,v.status,u.id_sucursal suc  `;
        this.sql += `FROM venta v,usuario u WHERE v.id_usuario = u.id`;
        if(this.user.privilegios =! "superadmin"){
          this.sql += ` and u.id_sucursal=${this.user.ID_sucursal}`;
          sqltot = `select sum(v.total) total from venta v,usuario u WHERE v.id_usuario=u.id and u.id = ${this.user.ID_sucursal}`;
        }  else{
          sqltot = `select sum(v.total) total from venta v`;
        }
        break;
      case "2":
        this.sql = `SELECT v.id,concat(u.nombre,' ',u.appat,' ',u.apmat) usuario,v.fechav fecha,v.total,v.descripcion,v.status,u.id_sucursal suc  `;
        this.sql += `FROM venta v,usuario u WHERE v.id_usuario = u.id and v.id = ${this.form.get('id')?.value}`;
        if(this.user.privilegios =! "superadmin"){
          this.sql += ` and u.id_sucursal=${this.user.ID_sucursal}`; 
          sqltot = `select v.total total from venta v,usuario u WHERE v.id_usuario=u.id and v.id = ${this.form.get('id')?.value} and u.id_sucursal = ${this.user.ID_sucursal}`;
        }else{
          sqltot = `select v.total total from venta v WHERE v.id = ${this.form.get('id')?.value}`;
        }
        
          
        break;
      case "3":
        this.sql = `SELECT v.id,concat(u.nombre,' ',u.appat,' ',u.apmat) usuario,v.fechav fecha,v.total,v.descripcion,v.status,u.id_sucursal suc `;
        this.sql += `FROM venta v,usuario u WHERE v.id_usuario = u.id and DATE(v.fechav) = '${this.form.get('fechaini')?.value}'`;
        
        if(this.user.privilegios =! "superadmin"){
          this.sql += ` and u.id_sucursal=${this.user.ID_sucursal}`;
          sqltot = `select sum(v.total) total from venta v,usuario u WHERE v.id_usuario = u.id and DATE(v.fechav) = '${this.form.get('fechaini')?.value}' and u.id_sucursal = ${this.user.ID_sucursal}`;
        
        }else{
          sqltot = `select sum(v.total) total from venta v WHERE DATE(v.fechav) = ${this.form.get('fechaini')?.value}`;
        
        }
        break;
      case "4":
        this.sql = `SELECT v.id,concat(u.nombre,' ',u.appat,' ',u.apmat) usuario,v.fechav fecha,v.total,v.descripcion,v.status,u.id_sucursal suc  `;
        this.sql += `FROM venta v,usuario u WHERE v.id_usuario = u.id and DATE(v.fechav) BETWEEN '${this.form.get('fechaini')?.value}' AND '${this.form.get('fechafin')?.value}'`;
        if(this.user.privilegios =! "superadmin"){
          this.sql += ` and u.id_sucursal=${this.user.ID_sucursal}`;
          sqltot = `select sum(v.total) total from venta v,usuario u WHERE v.id_usuario = u.id and DATE(v.fecha) BETWEEN '${this.form.get('fechaini')?.value}' and '${this.form.get('fechafin')?.value}' and u.id_sucursal = ${this.user.ID_sucursal}`;
        }else{
          sqltot = `select sum(v.total) total from venta v WHERE DATE(v.fecha) BETWEEN '${this.form.get('fechaini')?.value}' and '${this.form.get('fechafin')?.value}'`;
        
        }
        break;
      case "5":
        this.sql = `SELECT v.id,concat(u.nombre,' ',u.appat,' ',u.apmat) usuario,v.fechav fecha,v.total,v.descripcion,v.status,u.id_sucursal suc `;
        this.sql += `FROM venta v,usuario u WHERE v.id_usuario = u.id and concat(u.nombre,u.appat,u.apmat) LIKE '%${this.form.get('name')?.value}%'`;
        if(this.user.privilegios =! "superadmin"){
          this.sql += ` and u.id_sucursal=${this.user.ID_sucursal}`;
          sqltot = `select sum(v.total) total from venta v,usuario u WHERE v.id_usuario = u.id and concat(u.nombre,u.appat,u.apmat) LIKE '%${this.form.get('name')?.value}%' and u.id_sucursal = ${this.user.ID_sucursal}`;
        
        }else{
          sqltot = `select sum(v.total) total from venta v,usuario u WHERE v.id_usuario = u.id and concat(u.nombre,u.appat,u.apmat) LIKE '%${this.form.get('name')?.value}%'`;
 
        }
        
        break;
      case "6":
        this.sql = `SELECT v.id,concat(u.nombre,' ',u.appat,' ',u.apmat) usuario,v.fechav fecha,v.total,v.descripcion,v.status,u.id_sucursal suc  `;
        this.sql += `FROM venta v,usuario u WHERE v.id_usuario = u.id and u.id_sucursal = ${this.form.get('sucursal')?.value}`;
        if(this.user.privilegios =! "superadmin"){
          this.sql += ` and u.id_sucursal=${this.user.ID_sucursal}`;
          
        }else{

        }
        sqltot = `select sum(v.total) total from venta v,usuario u WHERE v.id_usuario = u.id and u.id_sucursal = ${this.form.get('sucursal')?.value}`;
 
        break;
                    
    }
    setTimeout(()=>{
      this.element?.reinicia();
    
    },100);
    this.request.consultas(sqltot).subscribe((res:any)=>{
      this.total = res[0].total;
    });
  }
  change(){
    if( this.option == "1" ){
      this.form.controls['id'].setValue("1");
      this.form.controls['name'].setValue("example");
      this.form.controls['fechaini'].setValue("example");
      this.form.controls['fechafin'].setValue("example");
      this.form.controls['sucursal'].setValue("1");


    }else if( this.option == "2" ){
      this.form.controls['id'].setValue("");
      this.form.controls['name'].setValue("example");
      this.form.controls['fechaini'].setValue("example");
      this.form.controls['fechafin'].setValue("example");
      this.form.controls['sucursal'].setValue("1");
    
    }else if( this.option == "3" ){

      this.form.controls['id'].setValue("1");
      this.form.controls['name'].setValue("example");
      this.form.controls['fechaini'].setValue("");
      this.form.controls['fechafin'].setValue("example");
      this.form.controls['sucursal'].setValue("1");

     
      
    }else if( this.option == "4" ){
      this.form.controls['id'].setValue("1");
      this.form.controls['name'].setValue("example");
      this.form.controls['fechaini'].setValue("");
      this.form.controls['fechafin'].setValue("");
      this.form.controls['sucursal'].setValue("1");
    }else if( this.option == "5" ){
      this.form.controls['id'].setValue("1");
      this.form.controls['name'].setValue("");
      this.form.controls['fechaini'].setValue("example");
      this.form.controls['fechafin'].setValue("example");
      this.form.controls['sucursal'].setValue("1");
    }else if( this.option == "6" ){
      this.form.controls['id'].setValue("1");
      this.form.controls['name'].setValue("example");
      this.form.controls['fechaini'].setValue("example");
      this.form.controls['fechafin'].setValue("example");
      this.form.controls['sucursal'].setValue("");
      
    }
  }
  ngOnInit(): void {
  }
  oneVenta(i:number){
    this.router.navigate(['one-venta',i]);
  }
  result(ev:any){
    this.ventas = ev;
  }

}
