import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-gest-view',
  templateUrl: './gest-view.component.html',
  styleUrls: ['./gest-view.component.css']
})
export class GestViewComponent implements OnInit {

  actionProd=true;
  actionSuc=false;
  actionCat=false;
  productos:any[]=[];
  sucursales:any[]=[];
  categorias:any[]=[];
  constructor(private request:RequestsService, private router:Router) { 
    this.request.viewProd().subscribe((res:any)=>{
      this.productos=res;
    });
  }

  ngOnInit(): void {
  }
  
  buscar(num:number){
    if(num == 0){
      this.actionProd=true;
      this.actionCat=false;
      this.actionSuc=false;
      this.request.viewProd().subscribe((res:any)=>{
        this.productos=res;
      });

    }else if(num == 1){
      this.actionProd=false;
      this.actionCat=true;
      this.actionSuc=false;
      this.request.viewCategoria().subscribe((res:any)=>{
        this.categorias=res;
      });

    }else if(num == 2){
      this.actionProd=false;
      this.actionCat=false;
      this.actionSuc=true;
      this.request.viewSucursal().subscribe((res:any)=>{
        this.sucursales=res;
      });
    }
    
    
  }

}
