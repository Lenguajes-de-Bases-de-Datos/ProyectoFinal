import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OptionsComponent } from 'src/app/home/options/options.component';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-read-categoria',
  templateUrl: './read-categoria.component.html',
  styleUrls: ['./read-categoria.component.css']
})
export class ReadCategoriaComponent implements OnInit {
  cats:any[] = [];
  lon:number =10;
  sentencia:string="UPDATE categoria SET status = ";
  sql:string="SELECT * FROM categoria";
  @ViewChild('pag') element?:PaginacionComponent;
  constructor(private request:RequestsService,private router:Router) { 
    this.request.consultas('SELECT * FROM categoria LIMIT 0,11').subscribe((res:any)=>{
      this.cats = res;
     
    });
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
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
  cambio(sql:string){
    this.sql = sql;
    this.element?.update(1);
  }
}
