import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-read-categoria',
  templateUrl: './read-categoria.component.html',
  styleUrls: ['./read-categoria.component.css']
})
export class ReadCategoriaComponent implements OnInit {
  cats:any[] = [];
  lon:number =10;
  sql:string="SELECT * FROM categoria";
  constructor(private request:RequestsService,private router:Router) { 
    this.request.consultas('SELECT * FROM categoria LIMIT 0,11').subscribe((res:any)=>{
      this.cats = res;
     
    });
  }

  ngOnInit(): void {
  }
  next(){
    
  }
  result(array:any){
    this.cats=array;
  }
  update(index:any){
    console.log(index);
    this.router.navigate(['/update-categoria',index]);
  }
  mas(index:number){
    console.log("indice "+index);
    this.router.navigate(['/card-categoria',index]);
  }
}
