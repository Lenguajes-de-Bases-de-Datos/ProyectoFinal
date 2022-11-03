import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {
  @Input() cont:number = 0;
  @Input() contpag:number=1;
  @Input() query:string="";
  @Output() array:EventEmitter<any[]>=new EventEmitter<any[]>();
  aux:string="";
  res:any[]=[];
  constructor(private request:RequestsService) { 
   
  }

  ngOnInit(): void {
    
    }
  reinicia(){
    this.cont = 0;
    this.contpag = 1;
    this.request.consultas(this.query+` LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.res =res;
      console.log("tam: "+res.length);
      this.array.emit(res);
    });
  }
  ngAfterViewInit(){
    console.log("pag: "+this.query);
    this.aux = this.query;
    this.request.consultas(this.query+` LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.res =res;
      console.log("pag: "+res);
    
      // this.array.emit(res);
    });
  }
  next(){
    
    if(this.query != this.aux){
      this.contpag=1;
      this.cont=0;
      this.aux = this.query;
    }else{
      this.contpag++;
      this.cont+=10;
    }
    console.log("next: "+this.query+` LIMIT${this.cont},11`);
    this.request.consultas(this.query+` LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.res =res;
      this.array.emit(res);
    });
  }
  previous(){
    
    if(this.query != this.aux){
      this.contpag=1;
      this.cont=0;
      this.aux = this.query;
    }else{
      this.contpag--;
      this.cont -= 10;
    }
    this.request.consultas(this.query+` LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.res =res;
      this.array.emit(res);
    });
  }
}
