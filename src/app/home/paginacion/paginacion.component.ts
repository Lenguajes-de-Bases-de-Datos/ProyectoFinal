import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {
  cont:number = 0;
  contpag:number=1;
  @Input() query:string="";
  @Output() array:EventEmitter<any[]>=new EventEmitter<any[]>();
  res:any[]=[];
  constructor(private request:RequestsService) { 
   
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    console.log("pag: "+this.query);
    this.request.consultas(this.query+` LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.res =res;
      console.log("pag: "+res);
    
      // this.array.emit(res);
    });
  }
  next(){
    this.contpag++;
    this.cont+=10;
    console.log("next: "+this.query+` LIMIT${this.cont},11`);
    this.request.consultas(this.query+` LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.res =res;
      this.array.emit(res);
    });
  }
  previous(){
    this.contpag--;
    this.cont-=10;
    
    this.request.consultas(this.query+` LIMIT ${this.cont},11`).subscribe((res:any)=>{
      this.res =res;
      this.array.emit(res);
    });
  }
}
