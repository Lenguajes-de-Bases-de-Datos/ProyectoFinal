import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {
  @Input() cont:number = 0;
  @Input() contpag:number=1;
  @Input() query:string="";
  @Input() isprocedure:boolean = false;
  @Input() procedure:string = "";
  
  @Output() array:EventEmitter<any[]>=new EventEmitter<any[]>();
  aux:string="";
  res:any[]=[];
  constructor(private request:RequestsService) { 
   
  }
  accion(tipo:string,sql:string){
   
    let texto:string="",action:string="",stat:number;
    if(tipo=='elimina'){
      texto="eliminar";
      stat=0;
      action="Eliminación";
    }else{
      texto="dar de alta";
      stat=1;
      action="Actualización";
    }
    swal.fire({
      title: '¿Esta seguro de hacerlo?',
      text: "luego no puede modificar los datos!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si, deseo ${texto}.`,
      icon:'warning'
    }).then((result)=>{
      if(result.value){
       
        let body={
          sql:sql,
          table:"usuario"
        }
        this.request.accion(body).subscribe({next:(res:any)=>{
          if(res.band){
            swal.fire({
              allowOutsideClick: true,
              title: "Exito...",
              text: `${action} exitosa...`,
              confirmButtonText:'Entendido'
            });
          }else{
            swal.fire({
              allowOutsideClick: true,
              title: "Error ...",
              text: `${action} exitosa...`,
              confirmButtonText:'Entendido'
            });
          }
        },
        error:(res:any)=>{
          swal.fire({
            allowOutsideClick: true,
            title: "Error ...",
            text: `La ${action} no se realizo...`,
            confirmButtonText:'Entendido'
          });
        }});
        
      }else{
        swal.fire({
          allowOutsideClick: true,
          title: "Cancelación de acción...",
          text: `La ${action} no se realizo ...`,
          confirmButtonText:'Entendido',
          icon:"success"
        });
      }
    });


  }
  ngOnInit(): void {
    
    }
  reinicia(){
    this.cont = 0;
    this.contpag = 1;
    this.aux = "";
    if(this.isprocedure){
      
      this.request.consultas(this.procedure+`${this.cont})`).subscribe((res:any)=>{
        this.res =res;
        this.array.emit(res);
      });
    }else{
      this.request.consultas(this.query+` LIMIT ${this.cont},11`).subscribe((res:any)=>{
        this.res =res;
        this.array.emit(res);
      });
    }
  }
  ngAfterViewInit(){
    this.aux = this.query;
    if(this.isprocedure){
      this.procedure += `${this.cont})`;
      this.request.consultas(this.procedure).subscribe((res:any)=>{
        this.res =res;
      });
    }else{
    this.request.consultas(this.query+` LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.res =res;
    
      // this.array.emit(res);
    });
  }
  }
  next(){
    
    
      this.contpag++;
      this.cont+=10;
   
      if(this.isprocedure){
        this.procedure += `${this.cont})`;
        this.request.consultas(this.procedure).subscribe((res:any)=>{
          this.res =res;
          this.array.emit(res);
        });
      }else{

      
        this.request.consultas(this.query+` LIMIT ${this.cont},11`).subscribe((res:any)=>{
          this.res =res;
          this.array.emit(res);
        });
    }
  }
  previous(){
    
   
      this.contpag--;
      this.cont -= 10;
    if(this.isprocedure){
      this.procedure += `${this.cont})`;
      this.request.consultas(this.procedure).subscribe((res:any)=>{
        this.res =res;
        this.array.emit(res);
      });
    }else{

    
      this.request.consultas(this.query+` LIMIT ${this.cont},11`).subscribe((res:any)=>{
        this.res =res;
        this.array.emit(res);
      });
    }
  }
  update(time:number){
    setTimeout(()=>{
      if(this.isprocedure){
        this.procedure += `${this.cont})`;
        this.request.consultas(this.procedure).subscribe((res:any)=>{
          this.res =res;
          this.array.emit(res);
        });
      }else{

        this.request.consultas(this.query+` LIMIT ${this.cont},11`).subscribe((res:any)=>{
          this.res =res;
          this.array.emit(res);
      
      
        });
    }
    },time);
  }
}
