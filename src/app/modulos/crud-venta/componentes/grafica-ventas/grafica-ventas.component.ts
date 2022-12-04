import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartDataset, Color, ChartOptions, ChartType } from 'chart.js';
import { RequestsService } from 'src/app/services/requests.service';
import * as moment from 'moment';
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
  barChartData: ChartDataset[] = [];
  barChartLabels: string[] = ['No De Sucursales'];
  bandgra:boolean=false;
  //Para que sea responsivo y adaptable para un celular
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {//titulo de la grafica
        display: true,
        text: 'Grafica De Número De Ventas En Todas Las Sucursales',
        font: {
          family: 'Fredoka One',
          size: 40,
        },
        color: '#cc0066'
      },
      legend: {//los simbolos de lo que es cada color de la grafica
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 15,
            family: 'Fredoka One',
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
              family: 'Fredoka One',
              weight: 'bold'
            }
          },
          title: {
            display: true, //debe de estar en true para que aparezca el titulo
            text:'Número de ventas',
            color: 'rgb(72, 72, 72)',
            font: {
              family: 'Fredoka One',
              size: 18,
              weight: 'bold'
            }
          }
      },
      x: {
        title: {
          display: true,
          text: 'Sucursales',
          font: {
            family: 'Fredoka One',
            size: 18,
            weight: 'bold'
          },
          color: 'rgb(72, 72, 72)'
        },
        ticks: {//los valore del eje x
          color: 'rgb(72, 0, 75)',
          font: {
            size: 18,
            family: 'Fredoka One',
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
      fechaini: new FormControl(moment().subtract(1,'month').format('YYYY-MM-DD'),[Validators.required]),
      fechafin: new FormControl(moment().format('YYYY-MM-DD'),[Validators.required]),
      
    });
    this.user = localStorage.getItem('cuenta');
    this.user = JSON.parse(this.user);
    if(this.user.privilegios == "superadmin"){
      this.issuper = true;
    }
    //this.obtener();
  }

  ngOnInit(): void {
  }

  aleatorio(l:string):number{
    if('b'==l){
      return Math.round(Math.random() * (220 - 30) + 30);
    }else if('s'==l){
      return Math.round(Math.random() * (8- 0) + 0);
    }else{
      return Math.round(Math.random() * (86 - 30) + 30);
    }
  }
  obtener(){
    this.bandgra=false;
    this.barChartData=[];
    if(this.issuper){
      this.request.consultas(`CALL reportes('v',0,'${this.form.get('fechaini')?.value}','${this.form.get('fechafin')?.value}')`)
      .subscribe((res:any)=>{
        this.array = res[0];
        console.log("Array")
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
    for(let i=0;i<this.array.length;i++){
      //vals.push(this.array[i].total);
      this.barChartData.push({data: [this.array[i].total], label: `Sucursal ${this.array[i].s}`, backgroundColor:`rgba(${this.aleatorio('b')}, ${this.aleatorio('s')}, ${this.aleatorio('b')})`, borderColor: `rgb(${this.aleatorio('sb')}, ${this.aleatorio('s')}, ${this.aleatorio('sb')})`,  borderWidth: this.ancho, type: this.barChartType, borderRadius: this.radius});
      //labels.push(this.array[i].s);
    }
    this.bandgra=true;
    console.log("Datos")
    console.log(this.barChartData);
  }
}
