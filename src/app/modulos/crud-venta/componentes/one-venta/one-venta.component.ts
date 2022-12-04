import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';

import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-one-venta',
  templateUrl: './one-venta.component.html',
  styleUrls: ['./one-venta.component.css']
})
export class OneVentaComponent implements OnInit {
  prods:any[]=[];
  obj:any;
  id:number=0;
  sql:string="";
  totprods:number=0;
  @ViewChild('paginacion') element?:PaginacionComponent;
  constructor(private request:RequestsService,private active:ActivatedRoute,private router:Router) {
    
    this.active.params.subscribe((params:Params)=>{
      if(params['id'] == undefined){

      }else{
        this.id = params['id'];
        this.request.consultas(`SELECT v.id,concat(u.nombre,' ',u.appat,' ',u.apmat) usuario,v.fechav fecha,v.total,v.descripcion,v.status FROM venta v,usuario u WHERE v.id_usuario = u.id and v.id = ${this.id}`).subscribe((res:any)=>{
          this.obj = res[0];
          
          
        });
        this.sql = `SELECT p.id id,p.nombre,c.ncategoria,dv.pproducto precio,dv.cantidad cant FROM `;
        this.sql += `detalle_venta dv,producto p,categoria c,venta v,usuario u WHERE dv.id_producto = p.id and p.categoria=c.id `;
        this.sql += `and dv.id_venta=v.id and v.id_usuario=u.id and u.id_sucursal = (SELECT u.id_sucursal FROM venta v,usuario u WHERE v.id_usuario=u.id and v.id=${this.id}) and v.id = ${this.id}`;
        this.request.consultas(this.sql).subscribe((res:any)=>{
          this.prods = res;
        });
        this.request.consultas(`SELECT count(*) tot FROM venta v,detalle_venta dv WHERE v.id = dv.id_venta and v.id = ${this.id}`).subscribe((res:any)=>{
          this.totprods = res[0].tot;
        });


      }
    }); 
    
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.element?.reinicia();
  }
  regresar(){
    this.router.navigate(['read-venta']);
  }
  result(ev:any){
    this.prods = ev;
  }
}
