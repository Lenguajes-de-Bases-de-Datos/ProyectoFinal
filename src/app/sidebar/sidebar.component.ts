import { Component, OnInit } from '@angular/core';
import { Options } from './options.model';
declare const events : any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  band:boolean=false;
  options:any[]=[
    {
      opcion:"Usuarios",
      class:"",
      ruta:"",
      icono:"",
      id:"users"
    },

    {
      opcion:"Categorias",
      class:"",
      ruta:"",
      icono:"",
      id:"categories"
    },
    {
      opcion:"Proveedores",
      class:"",
      ruta:"",
      icono:"",
      id:"providers"
    },
    {
      opcion:"Pedidos",
      class:"",
      ruta:"",
      icono:"",
      id:"orders"
    },

  ];
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    events();
  }
  scroll(){
    this.band=true;
    console.log("scroll");
    window.scrollTo(0,0);
  }
}
