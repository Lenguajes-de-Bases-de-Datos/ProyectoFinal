import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-card-categoria',
  templateUrl: './card-categoria.component.html',
  styleUrls: ['./card-categoria.component.css']
})
export class CardCategoriaComponent implements OnInit {
  datos:any={
    id:0,
    nombre:"",
    pasilloInicio:0,
    pasilloFin:0,
    status:0,
    productos:[]
  };
  delup:string="UPDATE producto SET status = ";
  sql:string="";
  op:string="p.";
  @ViewChild('paginacion') element?:PaginacionComponent;
  constructor(private request:RequestsService,private router:Router,private active:ActivatedRoute) {

    this.active.params.subscribe((params:Params)=>{

      if(params['id'] == undefined){

      }else{
        let i = params['id'];
         this.sql = `select c.id,c.ncategoria,c.pasilloInicio,c.pasilloFin,c.status,p.id "pid",p.nombre,p.precioUnitario,p.piezas,p.descripcion,if(p.status=1,'si','no') "statusp" 
        from categoria c,producto p WHERE p.categoria=c.id and ${i}=p.categoria`;
        this.request.consultas(this.sql).subscribe((res:any)=>{
          this.datos.id = res[0].id;
          this.datos.nombre = res[0].ncategoria;
          this.datos.pasilloInicio = res[0].pasilloInicio;
          this.datos.pasilloFin = res[0].pasilloFin;
          this.datos.status = res[0].status;
          // for(let i=0;i<res.length;i++ ){
          //   this.datos.productos.push(res[i].nombre);
          // }
          this.datos.productos = res;
        });

      }


    });

   }

  ngOnInit(): void {
  }
  result(res:any){
    this.datos.productos = res;
  }
  cambio(sql:string){
    this.sql = sql;
    this.element?.update(1);
  }
}
