import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-more-proveedor',
  templateUrl: './more-proveedor.component.html',
  styleUrls: ['./more-proveedor.component.css']
})
export class MoreProveedorComponent implements OnInit {
  proveedor:any;
  id:any;
  constructor(private request:RequestsService,private router:Router, private rutaActiva: ActivatedRoute) { 
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.id= params['id'];
      }
    );
    let sql=`SELECT p.ID ID, p.ID_ubicacion ID_ubicacion, p.nencargado, nencargado,
    p.nempresa nempresa, p.appat appat, p.apmat apmat, p.calle calle, p.numero numero,
    p.descripcion descripcion, p.email email, p.status status, p.telefono telefono,
    u.ID ID_u, u.estado estado, u.ciudad ciudad, u.colonia colonia, u.cp cp
    FROM proveedor p, ubicacion u WHERE p.ID=${this.id} and p.ID_ubicacion=u.ID`;
    this.request.consultas(sql).subscribe((res:any)=>{
      this.proveedor = res[0];
    });;
  }

  ngOnInit(): void {
  }

  regresar(){
    this.router.navigate(['/read-proveedor']);
  }

}
