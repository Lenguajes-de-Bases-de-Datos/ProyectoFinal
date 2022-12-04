import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  option:string="1";
  form!:FormGroup;
  @ViewChild('pag') element?:PaginacionComponent;
  constructor(private request:RequestsService,private router:Router) { 
    this.request.consultas('SELECT * FROM categoria LIMIT 0,11').subscribe((res:any)=>{
      this.cats = res;
     
    });
    this.form = new FormGroup({
      texto : new FormControl('',[Validators.required,Validators.pattern("[^\"\'|&]+")]),
      id : new FormControl('',[Validators.required,Validators.pattern("[0-9]+")])
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
    
    this.router.navigate(['/update-categoria',index]);
  }
  mas(index:number){
    
    this.router.navigate(['/card-categoria',index]);
  }
  cambio(sql:string){
    this.sql = sql;
    this.element?.update(1);
  }

  change(){
    if(this.option == "1"){
      this.sql='SELECT * FROM categoria';
      setTimeout(()=>{
        this.element?.reinicia();
      
      },200);
    }else if(this.option == "2"){
        this.form.controls['id'].setValue('123');     
    }else{
      this.form.controls['texto'].setValue('example');     
    
    }
  }
  buscar(){
    if(this.option == "2"){
      this.sql=`SELECT * FROM categoria WHERE lower(concat(ncategoria,pasilloInicio,pasilloFin)) like '%${this.form.get('texto')?.value}%'`;
   
    }else if(this.option == "3"){
      this.sql=`SELECT * FROM categoria WHERE id = ${this.form.get('id')?.value}`;     
      
    }else{

    }
    setTimeout(()=>{
      this.element?.reinicia();
    
    },200);
    
  }
}
