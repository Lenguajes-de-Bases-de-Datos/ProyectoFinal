import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-check-existencias',
  templateUrl: './check-existencias.component.html',
  styleUrls: ['./check-existencias.component.css']
})
export class CheckExistenciasComponent implements OnInit {
  sql:string="";
  sql2:string="";
  id:number=0;
  prods:any[]=[];
  prodspiezas:any[]=[];
  piezas:number=0;
  constructor(private request:RequestsService,private activate:ActivatedRoute) { 
    this.activate.params.subscribe((params:Params)=>{
      console.log("existemncias")
      if(params['id']==undefined){

      }else{
        this.id = params['id'];
        
        this.sql = `select p.nombre nom,p.pertenece pert,s.id id,concat(u.estado,' ',u.ciudad,' ',u.colonia,' ',s.calle,' #',s.numero) ubi,s.telefono,sp.existencias,p.precioUnitario,s.email `;
        this.sql += `FROM sucursal_producto sp,sucursal s,ubicacion u,producto p WHERE sp.id_sucursal=s.id and sp.id_producto=p.id and s.id_ubicacion=u.id and sp.id_producto=${this.id}`;
        this.request.consultas(this.sql).subscribe((res:any)=>{
          this.prods = res;
          this.piezas = res[0].pert;
          if(this.piezas!=null){
            this.sql2 = `select p.nombre nom,p.pertenece pert,s.id id,concat(u.estado,' ',u.ciudad,' ',u.colonia,' ',s.calle,' #',s.numero) ubi,s.telefono,sp.existencias,p.precioUnitario,s.email `;
            this.sql2 += `FROM sucursal_producto sp,sucursal s,ubicacion u,producto p WHERE sp.id_sucursal=s.id and sp.id_producto=p.id and s.id_ubicacion=u.id and sp.id_producto=${this.piezas}`;
            this.request.consultas(this.sql2).subscribe((res:any)=>{
              this.prodspiezas = res;
            })
          }
        });
      }

    });

  }

  ngOnInit(): void {
  }
  result(ev:any){
    this.prods = ev;
  } 
  result2(ev:any){

    this.prodspiezas = ev;
  }
}
