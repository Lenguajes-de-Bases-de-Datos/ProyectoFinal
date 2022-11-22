import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-read-venta',
  templateUrl: './read-venta.component.html',
  styleUrls: ['./read-venta.component.css']
})
export class ReadVentaComponent implements OnInit {
  ventas:any[]=[];
  sql:string="";
  sentencia:string="UPDATE venta SET status = ";
  constructor(private request:RequestsService,private router:Router) { 
    let user:any = localStorage.getItem('cuenta');
    user = JSON.parse(user);
    if(user.privilegios == 'superadmin'){
      this.sql = `SELECT v.id,concat(u.nombre,' ',u.appat,' ',u.apmat) usuario,v.fechav fecha,v.total,v.descripcion,v.status `;
      this.sql += `FROM venta v,usuario u WHERE v.id_usuario=u.id`;

    }else{

      this.sql = `SELECT v.id,concat(u.nombre,' ',u.appat,' ',u.apmat) usuario,v.fechav fecha,v.total,v.descripcion,v.status `;
      this.sql += `FROM venta v,usuario u WHERE v.id_usuario=u.id and u.id_sucursal=${user.ID_sucursal}`;
    }
    this.request.consultas(this.sql).subscribe((res:any)=>{
      this.ventas = res;
    });

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
