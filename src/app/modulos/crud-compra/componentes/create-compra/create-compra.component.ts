import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReadProductoComponent } from 'src/app/modulos/crud-producto/componentes/read-producto/read-producto.component';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';
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
  total:number=0;
  proveedor:any[ ]=[ ];
  idprov:number = 0;
  obs:string="";
  valida:boolean=true;
  
  @ViewChild('prods') element?:ReadProductoComponent;
  constructor(private request:RequestsService) { 
    this.form = new FormGroup({
      texto : new FormControl('',[Validators.required]),
      id : new FormControl('',[Validators.required])
    });
    this.in = new FormGroup({
      cantidad : new FormControl('',[Validators.required,Validators.pattern('[0-9]+')]),
      descripcion : new FormControl('',[Validators.required,Validators.pattern('[^\'\"!&|]+')])
    });
    this.request.consultas('SELECT * FROM proveedor').subscribe((res:any)=>{
      this.proveedor = res;
    })
  }

  ngOnInit(): void {
  }
  actTotal(key:any,i:number){
    if((key.keyCode >=96 && key.keyCode <=105 || key.keyCode>=48 && key.keyCode <= 57) && this.prod[i].cant.match("[0-9]+")){
      this.total -= this.prod[i].tot;
      this.prod[i].tot = this.prod[i].precio*this.prod[i].cant;
      this.total += this.prod[i].tot;
    }else if(key.keyCode != 8){
      this.prod[i].cant = 1;
      this.total -= this.prod[i].tot;
      this.prod[i].tot = this.prod[i].precio*this.prod[i].cant;
      this.total += this.prod[i].tot;
    }else{
      
    }
  }
change(){

}
buscar(){

}
  recep(obj:any){ 
    let i = this.prod.findIndex(p=>p.ID === obj.ID);
    
    if(i != -1){
      this.prod[i].cant++;
      this.prod[i].tot +=  this.prod[i].precio;
      this.total += this.prod[i].precio;
    }else{
      this.prod.push({
        ID:obj.ID,
        nombre:obj.nombre,
        precio:obj.precioUnitario*0.95,
        cant:1,
        tot:obj.precioUnitario*0.95
      });
      this.total += obj.precioUnitario*0.95;
    
    }
     
  } 
  realizaCompra(){
    if(this.obs.match("[|\"\'&]+")){
      swal.fire({
        backdrop: true, 
        allowOutsideClick: true,
        title: "Texto incorrecto en observaciones...",
        text: "No se permiten caracteres como \", ', |,etc...",
        confirmButtonText:'Entendido'
      });
    }else{
      let user:any = localStorage.getItem('cuenta');
      user = JSON.parse(user);
      let sql = `INSERT INTO compra (ID,ID_usuario,ID_prov,total,fecha,observaciones) `;
      sql += `VALUES(ID,${user.ID},${this.idprov},${this.total},now(),'${this.obs}')`;
      let body= {
        sql:sql,
        table:'compra'
      };
      this.request.accion(body).subscribe((res:any)=>{
        this.compProd();
      });
    
  }
  }
  compProd(){
    let user:any = localStorage.getItem('cuenta');
    user = JSON.parse(user);
    
    let sql="";
    let auxsql=`SELECT * FROM sucursal_producto WHERE ID_sucursal=${user.ID_sucursal} and ID_producto in(`;  
    
    sql = `INSERT INTO compra_producto VALUES`;
    this.request.consultas('SELECT MAX(id) id from compra').subscribe((res:any)=>{
      
      let id = res[0].id;
      for(let i = 0;i<this.prod.length;i++){
        sql += `(${this.prod[i].ID},${id},${this.prod[i].cant},${this.prod[i].precio})`;
        auxsql += `${this.prod[i].ID}` ;
        if(i == this.prod.length-1){
          
        }else{
          sql += ',';
          auxsql += `,` ;
        }
        
      }
      auxsql+=')';
      let body = {
        sql:sql,
        table:'compra_producto'
      };
      this.request.accion(body).subscribe((res:any)=>{
        this.prod=[];
        this.element?.update(1);
        this.valida = true;
        this.idprov = 0;
        this.total = 0;
        swal.fire({
          backdrop:true,
          allowOutsideClick: true,
          title: "Exito...",
          text: "Compra realizada exitosamente...",
          confirmButtonText:'Entendido'
        });
      });
      
      
      // this.insertaSucProd(auxsql,user.ID_sucursal);
    });
  }
  deleteOne(i:any){

    this.total -= this.prod[i].tot;
    this.prod.splice(i,1);
  }
  //insertarSucProd no se usa
  insertaSucProd(auxsql:string,suc:any){
    let sql = `INSERT INTO sucursal_producto VALUES `;
    let sql2 = `UPDATE sucursal_producto SET `;
    let band=false;
    this.request.consultas(auxsql).subscribe((res:any)=>{
      let i = 0;
      let j = 0;
      if(res.length>0){
      for(let i = 0;i<this.prod.length; i++){
        if(res[j].ID_producto == this.prod[i].ID){
          
          sql2 = `UPDATE sucursal_producto SET existencias=existencias + ${this.prod[i].cant} WHERE ID_sucursal = ${suc} and ID_producto = ${this.prod[i].ID}`;
        let body = {
          sql:sql2,
          table:'sucursal_producto'
        };
        this.request.accion(body).subscribe((res:any)=>{

        });
          j+1>res.length-1? j :j++;

        }else{
          band=true;
          sql += `(${suc},${this.prod[i].ID},${this.prod[i].cant},1,'caja')`;
          if(i == this.prod.length-1){

          }else{
            sql += ',';
          }
        }
       
      }
      if(sql[sql.length-1]==','){
        sql = sql.substring(0,sql.length-1);
      }
    }else{
      for(let i=0;i<this.prod.length;i++){
        
        sql += `(${suc},${this.prod[i].ID},${this.prod[i].cant},1,'caja')`;
          if(i == this.prod.length-1){

          }else{
            sql += ',';
          }
      
      }
      band=true;  
    }
      if(band){
        let body = {
          sql:sql,
          table:'sucursal_producto'
        }
        this.request.accion(body).subscribe((res:any)=>{
         
        });
      }else{
        
      }

    });
    setTimeout(()=>{
      this.prod=[];
      this.element?.update(1);
    },2000);
     this.valida = true;
     this.idprov = 0;
     this.total = 0;
     swal.fire({
      backdrop:true,
      allowOutsideClick: true,
      title: "Exito...",
      text: "Compra realizada exitosamente...",
      confirmButtonText:'Entendido'
    });
  }
  salir(i:any){
    if(this.prod[i].cant == ""){
      this.prod[i].cant = 1;
      this.total -= this.prod[i].tot;
      this.prod[i].tot = this.prod[i].precio*this.prod[i].cant;
      this.total += this.prod[i].tot;
    }
  }
  validar(){
    if(this.idprov!=0 &&this.prod.length>0){
      this.valida=false;
    }
  }
}
