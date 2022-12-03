import { Component, OnInit } from '@angular/core';
import { ChartDataset, Color, ChartOptions, ChartType } from 'chart.js';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-grafica-genero',
  templateUrl: './grafica-genero.component.html',
  styleUrls: ['./grafica-genero.component.css']
})
export class GraficaGeneroComponent implements OnInit {
  array:any[] = [];
  user:any ;
  barChartType: ChartType = 'bar';
   ancho = 3;
   radius = 8;
   
   barChartData: ChartDataset[] = [];
 
   barChartLabels: string[] = ['Numero de personal'];
 
   //Para que sea responsivo y adaptable para un celular
   barChartOptions: ChartOptions = {
     responsive: true,
     plugins: {
       title: {//titulo de la grafica
         display: true,
         text: 'Relación de Hombres y Mujeres dentro del sistema',
         font: {
           family: 'Impact',
           size: 40,
         },
         color: 'rgb(105, 7, 7)'
       },
       legend: {//los simbolos de lo que es cada color de la grafica
         labels: {
           // This more specific font property overrides the global property
           font: {
             size: 15,
             family: 'Consolas',
           },
           color: 'black'
         },
         position: 'bottom', 
       }/* ,
       subtitle: {
         display: true,
         text: 'Custom Chart Subtitle'
       }, */
     },
     scales: {//para el diseño de los ejes de la grafica
       y: {
           ticks: {//los valore del eje y
             color: 'rgb(72, 0, 75)',
             font: {
               size: 18,
               family: 'Alegrian',
               weight: 'bold'
             }
           },
           title: {
             display: true, //debe de estar en true para que aparezca el titulo
             text:'Numero de empleados del sistema',
             color: 'rgb(72, 72, 72)',
             font: {
               family: 'Verbana',
               size: 18,
               weight: 'bold'
             }
           }
       },
       x: {
         title: {
           display: true,
           text: 'Genero',
           font: {
             family: 'Verbana',
             size: 18,
             weight: 'bold'
           },
           color: 'rgb(72, 72, 72)'
         },
         ticks: {//los valore del eje x
           color: 'rgb(72, 0, 75)',
           font: {
             size: 18,
             family: 'Alegrian',
             weight: 'bold'
           }
         },
       },
       
     }
   };
   //Para que se puedan ver las leyendas
   barChartLegend = true;
   //Este abierta a plugins para mejorar el grafico
   barChartPlugins = [];
 
   constructor(private request:RequestsService) { 
    
    this.user = localStorage.getItem('cuenta');
    this.user = JSON.parse(this.user);
    this.obtener();
   }
 
   ngOnInit(): void {
   }
 
   aleatorio():number{
     return Math.round(Math.random() * (100 - 10) + 10);
   }
   obtener(){
    if(this.user.privilegios == "superadmin"){
      this.request.consultas('CALL reportes("g",0,"0000-00-00","0000-00-00")').subscribe((res:any)=>{
      this.array = res[0];
      this.rellenar();      
      });
    }else{
      this.request.consultas(`CALL reportes("g",${this.user.ID_sucursal},"0000-00-00","0000-00-00")`).subscribe((res:any)=>{
        this.array = res[0];
        console.log(this.array);
        this.rellenar();
      });
    }    
   }
   rellenar(){
    this.barChartData= [
      {data: [this.array[1].total], label: 'Hombres', backgroundColor:'rgba(115, 0, 147, 0.564)', borderColor: 'rgb(62, 2, 79)', borderWidth: this.ancho, type: this.barChartType, borderRadius: this.radius},
      {data: [this.array[0].total], label: 'Mujeres', backgroundColor:'rgba(122, 85, 0, 0.674)', borderColor: 'rgba(69, 49, 0, 0.981)', borderWidth: this.ancho, type: this.barChartType, borderRadius: this.radius},    
    ];
   }
}
