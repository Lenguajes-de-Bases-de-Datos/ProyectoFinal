import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-one-producto',
  templateUrl: './one-producto.component.html',
  styleUrls: ['./one-producto.component.css']
})
export class OneProductoComponent implements OnInit {
  nombre:string="";
  prods!:Observable<any>;
  constructor(private request:RequestsService,private router:Router,private active:ActivatedRoute) { 

    this.active.params.subscribe((params:Params)=>{

      if(params['nombre']==""){

      }else{
        this.nombre = params['nombre'];
        this.prods=this.request.consultas(`SELECT p.nombre,p.imagen,p.descripcion FROM producto p,categoria c WHERE p.categoria=c.id and concat(p.nombre,c.ncategoria) like '%${this.nombre}%'`)
        .pipe(map((data:any)=>data));

      }
    });


  }

  ngOnInit(): void {
  }

}
