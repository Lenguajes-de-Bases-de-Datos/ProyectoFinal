import { Component, OnInit } from '@angular/core';
import { ChartDataset, Color, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica-ventas',
  templateUrl: './grafica-ventas.component.html',
  styleUrls: ['./grafica-ventas.component.css']
})
export class GraficaVentasComponent implements OnInit {

  barChartType: ChartType = 'bar';
  ancho = 3;
  radius = 8;
  colors:string[] = ['rgb(69,177,223)', 'rgb(99,201,122)'];
  barChartData: ChartDataset[] = [
    { data: [this.aleatorio(),this.aleatorio()], borderWidth: this.ancho, type: this.barChartType, borderRadius: this.radius},
  ];
  barChartLabels: string[] = ['Enero','Febrero'];

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

  constructor() { }

  ngOnInit(): void {
  }

  shuffleData(){
    this.barChartData= [
     {data: [this.aleatorio(),this.aleatorio()],  borderWidth: this.ancho, type: this.barChartType, borderRadius: this.radius}, 
   ];
  }

  aleatorio():number{
    return Math.round(Math.random() * (100 - 10) + 10);
  }

}
