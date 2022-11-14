import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-one-compra',
  templateUrl: './one-compra.component.html',
  styleUrls: ['./one-compra.component.css']
})
export class OneCompraComponent implements OnInit {
  prods:any[]=[];
  compra:any={
    id:0,
    user:"",
    suc:0,
    prov:"",
    tot:0,
    fecha:"",
    obs:""
  };
  band=false;
  sum:number=0;
  constructor(private request:RequestsService,private active:ActivatedRoute) { 
    let user:any=localStorage.getItem('cuenta');
    user = JSON.parse(user);
    if(user!=undefined){
      if(user.privilegios == 'superadmin'){
        this.band=true;
      }
    }
    this.active.params.subscribe((params:Params)=>{
      if(params['id']==undefined){

      }else{

        let id = params['id'];
        this.request.consultas(`SELECT c.id,u.nombre,u.id_sucursal,concat(p.id,' ',p.nempresa) prov ,c.total,c.fecha,c.observaciones FROM compra c,usuario u,proveedor p WHERE c.ID_usuario=u.id and c.ID_prov=p.id and c.id = ${id}`)
        .subscribe((res:any)=>{
          this.compra.id=res[0].id;
          this.compra.user=res[0].nombre;
          this.compra.suc=res[0].id_sucursal;
          this.compra.prov=res[0].prov;
          this.compra.tot=res[0].total;
          this.compra.fecha=res[0].fecha;
          this.compra.obs=res[0].observaciones;

        });
        this.request.consultas(`CALL obtenerProductosCompra (${id})`).subscribe((res:any)=>{

          this.prods = res[0];

        }); 
        this.request.consultas(`select sum(p.precioUnitario*cp.cantidad) sum FROM compra c,producto p,compra_producto cp WHERE c.id=cp.id_comp and cp.id_prod=p.id and c.id=${id} Group By c.id`)
        .subscribe((res:any)=>{
          this.sum = res[0].sum;
        });

      }

    })


  }

  ngOnInit(): void {
  }

}
