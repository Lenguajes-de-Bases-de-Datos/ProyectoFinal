import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  constructor(private request:RequestsService,private router:Router,private active:ActivatedRoute) {

    this.active.params.subscribe((params:Params)=>{

      if(params['id'] == undefined){

      }else{
        let i = params['id'];
        let mysql = `select c.id,c.ncategoria,c.pasilloInicio,c.pasilloFin,p.nombre,p.imagen,c.status from categoria c,producto p WHERE ${i}=p.categoria`;
        this.request.consultas(mysql).subscribe((res:any)=>{
          this.datos.id = res[0].id;
          this.datos.nombre = res[0].ncategoria;
          this.datos.pasilloInicio = res[0].pasilloInicio;
          this.datos.pasilloFin = res[0].pasilloFin;
          this.datos.status = res[0].status;
          for(let i=0;i<res.length;i++ ){
            this.datos.productos.push(res[i].nombre);
          }

        });

      }


    });

   }

  ngOnInit(): void {
  }

}
