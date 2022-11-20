import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  @Output() event:EventEmitter<string>=new EventEmitter<string>();
  @Input() sql:string="";
  @Input() ref:string="";
  constructor() { }

  ngOnInit(): void {
    
  }
  filtro(option1:number){
  
   
    let aux = "";
   
   let lim = this.sql.indexOf('WHERE',0);
   let num = this.sql.includes('WHERE');
    if(!num ){
     
      if(option1 == 1){
        aux = this.sql;
      }else if(option1 == 2){
        aux = this.sql+` WHERE ${this.ref}status = 1`;
      }else{
       aux = this.sql += ` WHERE ${this.ref}status = 0`;
      }
    }else if(this.sql.includes(` ${this.ref}status = `)){
     
      if(option1 == 1){
        aux = this.sql.slice(0,lim);
      }else if(option1 == 2 && this.sql.includes(`${this.ref}status = 0`)){
        aux = this.sql.replace(`${this.ref}status = 0`,`${this.ref}status = 1`);
        
      }else if(option1 == 3 && this.sql.includes(`${this.ref}status = 1`)){
       aux = this.sql.replace(`${this.ref}status = 1`,`${this.ref}status = 0`);
       
      }else{
        aux = this.sql;
      }
    }else{
      
      if(option1 == 1){
        
        if(this.sql.includes(` and ${this.ref}status = 0`)){
          aux = this.sql.replace(` and ${this.ref}status = 0`,'');
        }else{
          aux = this.sql.replace(` and ${this.ref}status = 1`,'');
        }
      
      }else if(option1 == 2 ){
        if(this.sql.includes(` and ${this.ref}status = 0`)){
          aux = this.sql.replace(`${this.ref}status = 0`,`${this.ref}status = 1`);
        }else if(!this.sql.includes(` and ${this.ref}status = 1`)){
          aux = this.sql + ` and ${this.ref}status = 1`; 
        }else{
          aux = this.sql;
        } 
      }else if(option1 == 3 ){
        if( this.sql.includes(` and ${this.ref}status = 1`)){
          aux = this.sql.replace(`${this.ref}status = 1`,`${this.ref}status = 0`);
      
        }else if(!this.sql.includes(` and ${this.ref}status = 0`)){
          aux = this.sql + ` and ${this.ref}status = 0`; 
          
        }else{
          aux = this.sql;
        }
      }else{
        aux = this.sql;
      }
    } 
  
    this.sql =aux;
    console.log("mysql: "+this.sql);
    this.event.emit(this.sql);
    // let obj = new PaginacionComponent(this.request);
    // obj.update();
  }
}
