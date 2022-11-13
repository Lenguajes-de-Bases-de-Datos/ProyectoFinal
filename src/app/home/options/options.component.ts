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
    console.log("wiiii")
  }
  filtro(option1:number){
  
    console.log("valor ref: "+this.ref)
    let aux = "";
   console.log("d: "+this.sql.indexOf('WHERE',0));
   let lim = this.sql.indexOf('WHERE',0);
   let num = this.sql.includes('WHERE');
    if(!num ){
      console.log("s1")
      console.log("entre")
      if(option1 == 1){
        aux = this.sql;
      }else if(option1 == 2){
        aux = this.sql+` WHERE ${this.ref}status = 1`;
      }else{
       aux = this.sql += ` WHERE ${this.ref}status = 0`;
      }
    }else if(this.sql.includes(` ${this.ref}status = `)){
      console.log("s2"+ `${this.ref}status = 0`)
      if(option1 == 1){
        aux = this.sql.slice(0,lim);
      }else if(option1 == 2 && this.sql.includes(`${this.ref}status = 0`)){
        aux = this.sql.replace(`${this.ref}status = 0`,`${this.ref}status = 1`);
        console.log("op2 "+aux)
      }else if(option1 == 3 && this.sql.includes(`${this.ref}status = 1`)){
       aux = this.sql.replace(`${this.ref}status = 1`,`${this.ref}status = 0`);
       console.log("op3 "+aux)
      }else{
        aux = this.sql;
      }
    }else{
      console.log("siiii")
      if(option1 == 1){
        console.log("todo")
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
