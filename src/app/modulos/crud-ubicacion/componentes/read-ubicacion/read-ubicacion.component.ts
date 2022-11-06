import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-read-ubicacion',
  templateUrl: './read-ubicacion.component.html',
  styleUrls: ['./read-ubicacion.component.css']
})
export class ReadUbicacionComponent implements OnInit {
  form!:FormGroup;
  ubicaciones:any[]=[];
  title:string='Todos';
  cont:number = 0;
  contpag:number=1;
  sql:string="SELECT * FROM ubicacion";
  option:string="1";
  controlador:number = 0;
  bandInt:boolean=false;
  bandAll:boolean=true;
  bandCiudad:boolean=false;
  bandEstado:boolean=false;
  resEstados:any[]=[];
  optionEstado:any;
  optionCiudad:any;
  resCiudades:any[]=[];
  a:any; b:any;
  constructor(private request:RequestsService) {
    this.request.consultas('SELECT * FROM ubicacion LIMIT 0,11').subscribe((res:any)=>{
      this.ubicaciones = res;
    });

    this.sql = "SELECT * FROM ubicacion";
    this.form = new FormGroup({
      id_sup : new FormControl('2',[Validators.required,Validators.pattern('[0-9]+')]),
      id_inf : new FormControl('7',[Validators.required,Validators.pattern('[0-9]+')])
    });
    
    this.request.consultas('SELECT estado FROM ubicacion GROUP BY estado').subscribe((res:any)=>{
      this.resEstados = res;
    });

    this.request.consultas('SELECT ciudad FROM ubicacion GROUP BY ciudad').subscribe((res:any)=>{
      this.resCiudades = res;
    });
   }

  ngOnInit(): void {
  }

  buscar(){
    this.sql = "SELECT * FROM ubicacion";
    this.controlador = 0;
    this.cont = 0;
    this.contpag = 1;
    console.log(this.option);
     this.sql = `SELECT * FROM ubicacion WHERE `;
    if(this.option == "1"){
      this.sql = `SELECT * FROM ubicacion`;
      this.title = 'Todos';
    }else if(this.option == "2"){
      this.sql += `estado = '${this.optionEstado}'`;
      this.title = 'Ubicación por Estados';
    }else if(this.option == "3"){
      this.sql += `ciudad = '${this.optionCiudad}'`;
      this.title = 'Ubicación por Ciudad';
    }else if(this.option == "4"){
      if(this.form.get('id_inf')?.value > this.form.get('id_sup')?.value){
        swal.fire({
          title: 'Error del intervalo',
          text: "El numero menor debe de estar en el ID del intervalo inferior y el ID superior un numero mayor al del inferior"+
          "\nSi quiees que se corrija este erro dar en aceptar. Y vuelve a dar click en Buscar",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: `Aceptar.`,
          icon:'warning'
        }).then((result)=>{
          if(result.value){
            this.b = this.form.get('id_inf')?.value;
            this.a = this.form.get('id_sup')?.value;
            this.title = 'Intervalo ed ID ubicación';
            this.form.patchValue({
              id_sup : this.b,
              id_inf : this.a
            });
            //this.buscar();
            this.sql = `SELECT * FROM ubicacion WHERE ID BETWEEN ${this.form.get('id_inf')?.value} and ${this.form.get('id_sup')?.value}`;
            return;
          }else{
            swal.fire({
              allowOutsideClick: true,
              title: "Error rechazo de corrección",
              text: `No se quizo correjir no hay consulta elegida.\nIngresa bien el intervalo`,
              confirmButtonText:'Entendido',
              icon:"error"
            });
            this.option = "1";
            this.change();
            this.buscar();
            return;
          }
        });
      }else{
        this.title = 'Intervalo ed ID ubicación';
        this.sql += `ID BETWEEN ${this.form.get('id_inf')?.value} and ${this.form.get('id_sup')?.value}`;
      }
    }
  }
  
  change(){
    if(this.option == "1"){
      this.controlador = 1;
    }else if(this.option == "2"){
      this.controlador = 2;
    }else if(this.option == "3"){
      this.controlador = 3;
    }else if(this.option == "4"){
      this.controlador = 4;
    }
  }
  next(){
    this.contpag++;
    this.cont+=10;
    this.request.consultas(`${this.sql} LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.ubicaciones = res;
    });
  }

  previous(){
    this.contpag--;
    this.cont-=10;
    this.request.consultas(`${this.sql} LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.ubicaciones = res;
    });
  }
  result(res:any){
    this.ubicaciones = res;
  }
  moreUser(id:number){
    alert("ID de la ubicación ----> "+id);
  }
}
