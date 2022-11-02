import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-read-categoria',
  templateUrl: './read-categoria.component.html',
  styleUrls: ['./read-categoria.component.css']
})
export class ReadCategoriaComponent implements OnInit {
  cats:any[] = [];
  lon:number =10;
  constructor(private request:RequestsService) { 
    this.request.consultas('SELECT * FROM categoria').subscribe((res:any)=>{
      this.cats = res;
     
    });
  }

  ngOnInit(): void {
  }
  next(){
    
  }

}
