import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-more-user',
  templateUrl: './more-user.component.html',
  styleUrls: ['./more-user.component.css']
})
export class MoreUserComponent implements OnInit {
  user:any;
  ID:number | undefined;
  path:string = "../../../../../../assets/img/";
  /**@Output() SendDatas = new EventEmitter<number>();
  @Input() id:number | undefined;**/
  constructor(private request:RequestsService,private router:Router, private rutaActiva: ActivatedRoute) { 
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.ID= params['ID'];
      }
    );
    let sql=`SELECT us.ID id_usuario, us.ID_sucursal id_suc_us, us.password, us.nombre, us.appat, us.apmat, us.privilegios, us.des, us.email, us.status,
    us.activo,imagen, us.telefono, us.salario, us.genero, us.fecha, s.ID id_sucursal, s.ID_ubicacion id_ubi_suc, s.calle, s.numero, s.email, 
    ub.ID id_ubicacion, ub.estado, ub.ciudad, ub.colonia, ub.cp FROM usuario us, sucursal s, ubicacion ub WHERE us.ID=${this.ID} and us.ID_sucursal=s.ID 
    and s.ID_ubicacion=ub.ID`;
    this.request.consultas(sql).subscribe((res:any)=>{
      this.user = res[0];
      this.path += this.user.imagen;
    });;
  }

  ngOnInit(): void {
  }

  regresar(){
    this.router.navigate(['/read-users']);
  }
}
