import { Component, Input, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
import { RequestsService } from 'src/app/services/requests.service';


@Component({
  selector: 'app-read-producto',
  templateUrl: './read-producto.component.html',
  styleUrls: ['./read-producto.component.css']
})
export class ReadProductoComponent implements OnInit {
  option:string="";
  form!:FormGroup;
  sql:string="SELECT p.ID ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas FROM producto p,categoria c WHERE p.categoria = c.id";
  productos:any[]=[];
  op:string="p.";
  sentencia:string="UPDATE producto SET status = ";
  @Input() cart:boolean = false;
  @Output() ev:EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('paginacion') element?:PaginacionComponent;
  constructor(private request:RequestsService) { 
    this.form = new FormGroup({
      texto : new FormControl('',[Validators.required]),
      id : new FormControl('',[Validators.required])
    });
    this.request.consultas(this.sql+' LIMIT 0,11').subscribe((res:any)=>{
      this.productos = res;
    });
  }

  ngOnInit(): void {
  }
  change(){
    if(this.option == "1"){
      this.sql="SELECT p.ID ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas FROM producto p,categoria c WHERE p.categoria = c.id";
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
      this.sql=`SELECT p.ID ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas FROM producto p,categoria c WHERE p.categoria = c.id and lower(concat(p.nombre,c.ncategoria)) like '%${this.form.get('texto')?.value}%'`;
      
    }else if(this.option == "3"){
      this.sql=`SELECT p.ID ID,c.ncategoria,p.nombre,p.descripcion,p.precioUnitario,p.status,p.piezas FROM producto p,categoria c WHERE p.categoria = c.id and p.id = ${this.form.get('id')?.value}`;
      
    }else{

    }
    setTimeout(()=>{
      this.element?.reinicia();
    
    },200);
    
  }
  result(res:any){
    this.productos = res;
  }
  resp(resp:any){
    this.ev.emit(resp);
  }
  cambio(sql:string){
    this.sql = sql;
    this.element?.update(1);
  }
  update(id:number){
    
  }
}
