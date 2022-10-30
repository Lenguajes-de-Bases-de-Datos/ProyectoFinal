import { Component, OnInit } from '@angular/core';
import { Options } from './options.model';
declare const events : any;
import jwt_decode from "jwt-decode";
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
      rutas:{
        create:'/sign-up',
        read:'/read-users',
        update:'',
        delete:''
      },
      icono:"",
      id:"users"
    },

    {
      opcion:"Categorias",
      class:"",
      rutas:{
        create:'',
        read:'',
        update:'',
        delete:''
      },
      icono:"",
      id:"categories"
    },
    {
      opcion:"Proveedores",
      class:"",
      rutas:{
        create:'',
        read:'',
        update:'',
        delete:''
      },
      icono:"",
      id:"providers"
    },
    {
      opcion:"Pedidos",
      class:"",
      rutas:{
        create:'',
        read:'',
        update:'',
        delete:''
      },
      icono:"",
      id:"orders"
    },
    {
      opcion:"Enviar notificación",
      class:"",
      rutas:{
        create:'/send-msg'
      },
      icono:"",
      id:"send-msg"
    },

  ];
  constructor() { try {
    let token = sessionStorage.getItem('token') || "";
    let resp = jwt_decode(token);
  } catch(Error) {
    console.log(Error);
  }}

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    events();
  }
  scroll(){
    this.band=true;
   
    window.scrollTo(0,0);
  }
}
