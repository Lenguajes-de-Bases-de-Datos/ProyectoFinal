import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';

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
  constructor(private request:RequestsService) { 
    let user:any = localStorage.getItem('cuenta');
    user = JSON.parse(user);
    this.sql = "select p.id,p.nombre,c.ncategoria,sp.existencias,p.precioUnitario ";
    this.sql += `FROM producto p,sucursal_producto sp,categoria c WHERE p.id=sp.id_producto and p.categoria=c.id and sp.id_sucursal=${user.ID_sucursal}`;
    this.prods = this.request.consultas(this.sql).pipe(map((data:any)=>data));
  }
  actTotal(ev:any,i:number){

  }
  agregar(obj:any){
    let i = this.prod.findIndex((p:any)=>p.id===obj.id);
    if(i!=-1){
      this.prod[i].cant++;
      this.prod[i].tot = this.prod[i].tot + this.prod[i].precio;
      
    }else{
      this.prod.push({
        id:obj.id,
        nombre:obj.nombre,
        categoria:obj.ncategoria,
        cant:1,
        precio:obj.precioUnitario,
        tot:obj.precioUnitario
      });
    }
  }
  ngOnInit(): void {
  }

}
