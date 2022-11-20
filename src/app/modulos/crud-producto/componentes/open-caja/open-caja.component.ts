import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-open-caja',
  templateUrl: './open-caja.component.html',
  styleUrls: ['./open-caja.component.css']
})
export class OpenCajaComponent implements OnInit {
  user:any;
  sql:string="";
  prods:any[]=[];
  @ViewChild('paginacion') element?:PaginacionComponent;
  constructor(private request:RequestsService) { 
    this.user = localStorage.getItem('cuenta');
    this.user = JSON.parse(this.user);
    if(this.user.privilegios != "superadmin"){
      this.sql = `SELECT p.id ID,p.categoria id_cat,p.imagen img,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas,IFNULL(sp.existencias,'Sin registro') existencias,sp.id_sucursal suc,p.pertenece pert `;
      this.sql += `FROM producto p,categoria c,sucursal_producto sp WHERE p.categoria=c.id and p.id=sp.id_producto and sp.id_sucursal = ${this.user.ID_sucursal} and pieza=0`;
    }else{

    }
    this.request.consultas(this.sql).subscribe((res:any)=>{
      this.prods = res;
    });
  }
  abrir(obj:any){
    if(obj.existencias>0){
      let sql = `UPDATE sucursal_producto SET existencias=existencias-1 WHERE id_producto=${obj.ID} and id_sucursal=${this.user.ID_sucursal}`;
      let body = {
        sql:sql,
        table:'sucursal_producto'
      }
      this.request.accion(body).subscribe((res:any)=>{
        if(res.band){
          if(obj.pert == null){
          let sql = `INSERT INTO producto VALUES(id,${obj.id_cat},'${obj.nombre} (por pieza)','${obj.descripcion}',${obj.precioUnitario}/${obj.piezas},1,'${obj.img}',1,NULL,1)`;
          let body = {
            sql:sql,
            table:'producto'
          }
          
   

          this.request.accion(body).subscribe((res:any)=>{
            if(res.band){
              let sql = `UPDATE producto SET pertenece = (SELECT LAST_INSERT_ID() FROM DUAL) WHERE id=${obj.ID}`;
              let body = {
              sql:sql,
              table:'producto'
            }   
            let i = 0;
            let b = `SELECT LAST_INSERT_ID() id FROM DUAL`;
              
            this.request.accion(body).subscribe((res:any)=>{
              if(res.band){
                this.request.consultas(b).subscribe((res:any)=>{
                  i = res[0].id;
                  let p = {
                    sql:`CALL insertPiezas(${this.user.ID_sucursal},${i},${obj.piezas},1,'pieza')`
                  }
                  this.request.accion(p).subscribe((res:any)=>{
                    if(res.band){
                      swal.fire({
                        backdrop:true,
                        allowOutsideClick: true,
                        title: "Exito...",
                        text: "Producto abierto exitosamente...",
                        icon:'success',
                        confirmButtonText:'Entendido'
                      });
                      this.element?.update(1);
                    }
                  });
                });
                
                
                
              }
            })
          }
          })
        }else{
          this.request.accion({sql:`CALL insertPiezas(${this.user.ID_sucursal},${obj.pert},${obj.piezas},1,'pieza')`}).subscribe((res:any)=>{
            swal.fire({
              backdrop:true,
              allowOutsideClick: true,
              title: "Exito...",
              text: "Producto abierto exitosamente...",
              confirmButtonText:'Entendido',
              icon:'success'
            });
            this.element?.update(1);
          });
        }
        }else{

        }
      });
    }else{
      swal.fire({
        backdrop:true,
        allowOutsideClick: true,
        title: "Error...",
        text: "No es posible realizar la acción sin existencias...",
        confirmButtonText:'Entendido',
        icon:'error'
      });
    }
    
  }
  ngOnInit(): void {
  }
  result(ev:any){
    this.prods = ev;
  }
}
