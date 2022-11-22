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
        nombre:'Crear'
       },
       { 
        ruta:'/read-users',
        nombre:'Consultar'
       } ,
       {
        ruta:'update-user',
        nombre:'Actualizar'
       }, 
       {
        ruta:'delete-user',
        nombre:'Eliminar'
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
        nombre:'Crear'
      },
       { 
        ruta:'/read-categoria',
        nombre:'Consultar'
       } ,
       {
        ruta:'/update-categoria',
        nombre:'Actualizar'
       }, 
       {
        ruta:'',
        nombre:'Eliminar'
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
        nombre:'Crear'
      },
       { 
        ruta:'/read-sucursal',
        nombre:'Consultar'
       } ,
       {
        ruta:'/update-sucursal',
        nombre:'Actualizar'
       }, 
       {
        ruta:'',
        nombre:'Eliminar'
        
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
        nombre:'Crear'
      },
      { 
        ruta:'/open-caja',
        nombre:'Abrir caja'
       } ,
       { 
        ruta:'/read-producto',
        nombre:'Consultar'
       } ,
       {
        ruta:'',
        nombre:'Actualizar'
       }, 
       {
        ruta:'',
        nombre:'Eliminar'
      }
    ],
      icono:"",
      id:"orders",
      data:['administrador','superadmin','vendedor','almacenista','reponedor']
    },
    {
      opcion:"Compras",
      class:"",
      rutas:[{
        ruta:'/create-compra',
        nombre:'Crear'
      },
       { 
        ruta:'/read-compra',
        nombre:'Consultar'
       } ,
       {
        ruta:'',
        nombre:'Actualizar'
       }, 
       {
        ruta:'',
        nombre:'Eliminar'
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
        nombre:'Crear'
       },
       { 
        ruta:'/read-venta',
        nombre:'Consultar'
       } ,
       {
        ruta:'update-user',
        nombre:'Actualizar'
       }, 
       {
        ruta:'delete-user',
        nombre:'Eliminar'
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
        nombre:'Crear Notificación'
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
        nombre:'Crear'
      },
       { 
        ruta:'/read-ubicacion',
        nombre:'Consultar'
       } ,
       {
        ruta:'/update-ubicacion',
        nombre:'Actualizar'
       }, 
       {
        ruta:'',
        nombre:'Eliminar'
       
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
