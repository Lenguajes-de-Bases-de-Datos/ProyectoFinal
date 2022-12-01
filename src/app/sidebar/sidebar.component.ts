import { Component, OnInit } from '@angular/core';
import { Options } from './options.model';
declare const events : any;
import jwt_decode from "jwt-decode";
import { RequestsService } from '../services/requests.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  band:boolean=false;
  user:any;
  options:any[]=[
    {
      opcion:"Usuarios",
      class:"",

      rutas:[
       {
        ruta:'sign-up',
        nombre:'Crear',
        excluye:[""]
       },
       { 
        ruta:'/read-users',
        nombre:'Consultar',
        excluye:[""]
       } ,
       {
        ruta:'update-user',
        nombre:'Actualizar',
        excluye:[""]
       }, 
       {
        ruta:'delete-user',
        nombre:'Eliminar',
        excluye:[""]
      }
    ],
      icono:"",
      id:"users",
      data:['administrador','superadmin']
    },

    {
      opcion:"Categorias",
      class:"",
      rutas:[{
        ruta:'/create-categoria',
        nombre:'Crear',
        excluye:[""]
      },
       { 
        ruta:'/read-categoria',
        nombre:'Consultar',
        excluye:[""]
       } ,
       {
        ruta:'/update-categoria',
        nombre:'Actualizar',
        excluye:[""]
       }
    ],
      icono:"",
      id:"categories",
      data:['administrador','superadmin','vendedor','almacenista','reponedor']
    },
    {
      opcion:"Sucursales",
      class:"",
      rutas:[{
        ruta:'/create-sucursal',
        nombre:'Crear',
        excluye:["administrador"]
      },
       { 
        ruta:'/read-sucursal',
        nombre:'Consultar',
        excluye:[""]
       } ,
       {
        ruta:'/update-sucursal',
        nombre:'Actualizar',
        excluye:[""]
       }
    ],
      icono:"",
      id:"providers",
      data:['administrador','superadmin']
    },
    {
      opcion:"Productos",
      class:"",
      rutas:[{
        ruta:'/create-producto',
        nombre:'Crear',
        excluye:[""]
      },
      { 
        ruta:'/open-caja',
        nombre:'Abrir caja',
        excluye:[""]
       } ,
       { 
        ruta:'/read-producto',
        nombre:'Consultar',
        excluye:[""]
       } ,
       {
        ruta:'',
        nombre:'Actualizar',
        excluye:[""]
       }
    ],
      icono:"",
      id:"orders",
      data:['administrador','superadmin','vendedor','almacenista','reponedor']
    },
    {
      opcion:"Proveedores",
      class:"",
      rutas:[{
        ruta:'/create-proveedor',
        nombre:'Crear',
        excluye:[""]
      },
       { 
        ruta:'/read-proveedor',
        nombre:'Consultar',
        excluye:[""]
       } ,
       {
        ruta:'',
        nombre:'Actualizar',
        excluye:[""]
       }, 
       {
        ruta:'',
        nombre:'Eliminar',
        excluye:[""]
      }
    ],
      icono:"",
      id:"proveedor",
      data:['administrador','superadmin','vendedor','almacenista']
    },
    {
      opcion:"Compras",
      class:"",
      rutas:[{
        ruta:'/create-compra',
        nombre:'Crear',
        excluye:["superadmin"]
      },
       { 
        ruta:'/read-compra',
        nombre:'Consultar',
        excluye:[""]
       } ,
       {
        ruta:'/user-compra',
        nombre:'Compras por cada usuario',
        excluye:["vendedor","almacenista","reponedor"]
       }
    ],
      icono:"",
      id:"compras",
      data:['administrador','superadmin','almacenista']
    },

    {
      opcion:"Ventas",
      class:"",

      rutas:[
       {
        ruta:'/create-venta',
        nombre:'Crear',
        excluye:["superadmin"]
       },
       { 
        ruta:'/read-venta',
        nombre:'Consultar',
        excluye:[""]
       } ,
       {
        ruta:'/user-venta',
        nombre:'Ventas por cada usuario',
        excluye:["vendedor","almacenista","reponedor"]
       }
    ],
      icono:"",
      id:"ventas",
      data:['administrador','superadmin','vendedor']
    },

    {
      opcion:"Enviar notificación",
      class:"",
      rutas:[{
        ruta:'/send-msg',
        nombre:'Crear Notificación',
        excluye:[""]
      }
    ],
      icono:"",
      id:"send-msg",
      data:['administrador','superadmin','vendedor','almacenista','reponedor']
    },
    {
      opcion:"Ubicación",
      class:"",
      rutas:[{
        ruta:'/create-ubicacion',
        nombre:'Crear',
        excluye:[""]
      },
       { 
        ruta:'/read-ubicacion',
        nombre:'Consultar',
        excluye:[""]
       } ,
       {
        ruta:'/update-ubicacion',
        nombre:'Actualizar',
        excluye:[""]
       }, 
       {
        ruta:'',
        nombre:'Eliminar',
        excluye:[""]
      }
    ],
      icono:"",
      id:"ubicacion",
      data:['administrador','superadmin','vendedor','almacenista','reponedor']
    },
  ];
  constructor(private request:RequestsService) {
    this.user = localStorage.getItem('cuenta');
    this.user = JSON.parse(this.user);
    try {
      let token = sessionStorage.getItem('token') || "";
      let resp:any = jwt_decode(token);
      if(resp!=undefined){
        this.request.sucursal = resp.sucursal;
        console.log("suc: "+this.request.sucursal)
      }
      
    } catch(Error) {
      console.log(Error);
    }
  }

  ngOnInit(): void {
    console.log(this.options[0].data.includes('administrador'));
  }
  ngAfterViewInit(){
    events();
  }
  scroll(){
    this.band=true;
   
    window.scrollTo(0,0);
  }
}
