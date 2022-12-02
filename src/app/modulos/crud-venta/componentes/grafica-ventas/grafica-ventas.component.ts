import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartDataset, Color, ChartOptions, ChartType } from 'chart.js';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-grafica-ventas',
  templateUrl: './grafica-ventas.component.html',
  styleUrls: ['./grafica-ventas.component.css']
})
export class GraficaVentasComponent implements OnInit {
  array:any[]=[];
  issuper:boolean=false;
  form:FormGroup;
  user:any;
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
          text: 'Ventas por sucursal',
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
    this.form = new FormGroup({
      fechaini: new FormControl('',[Validators.required]),
      fechafin: new FormControl('',[Validators.required]),
      
    });
    this.user = localStorage.getItem('cuenta');
    this.user = JSON.parse(this.user);
    if(this.user.privilegios == "superadmin"){
      this.issuper = true;
    }
  }

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
  obtener(){
    if(this.issuper){
      this.request.consultas(`CALL reportes('v',0,'${this.form.get('fechaini')?.value}','${this.form.get('fechafin')?.value}')`)
      .subscribe((res:any)=>{
        this.array = res[0];
        console.log(this.array)
        this.rellenar();
      })
    }else{
      this.request.consultas(`CALL reportes('v',${this.user.ID_sucursal},'${this.form.get('fechaini')?.value}','${this.form.get('fechafin')?.value}')`)
      .subscribe((res:any)=>{
        this.array = res[0];
        console.log(this.array)
        this.rellenar();
      })
    }
  }
  rellenar(){
    let vals:any = [];
    let labels:string[]=[];
    for(let i=0;i<this.array.length;i++){
      vals.push(this.array[i].total);
      labels.push(this.array[i].s);
    } 
    this.barChartData= [
      {data: vals,  borderWidth: this.ancho, type: this.barChartType, borderRadius: this.radius}, 
    ];
    this.barChartLabels = labels;
  }
}
