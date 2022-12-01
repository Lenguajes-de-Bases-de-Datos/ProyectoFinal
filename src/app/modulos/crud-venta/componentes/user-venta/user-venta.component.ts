import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-user-venta',
  templateUrl: './user-venta.component.html',
  styleUrls: ['./user-venta.component.css']
})
export class UserVentaComponent implements OnInit {

  procedure:string="CALL cvtotales('v',0,'g','t','1999-10-10','1999-10-10','a',";
  res:any[]=[];
  user:any;
  option:string = "";
  issuper:boolean=false;
  form:FormGroup;
  
  @ViewChild('pag') element?:PaginacionComponent;
  constructor(private request:RequestsService) { 
    this.form = new FormGroup ({
      fechaini : new FormControl('0000-00-00',[Validators.required]),
      fechafin : new FormControl('0000-00-00',[Validators.required]),
      name : new FormControl('example',[Validators.required,Validators.pattern("[^|\"\'&]+")]),
      sucursal : new FormControl('1',[Validators.required,Validators.pattern("[0-9]+")]),
      
    });
    this.user = localStorage.getItem('cuenta');
    this.user = JSON.parse(this.user);
    if(this.user.privilegios == "superadmin"){
      this.request.consultas(this.procedure+"0)").subscribe((res:any)=>{
        this.res = res[0];
      });
      this.issuper = true;
    }else{
      this.procedure = `CALL cvtotales('v',${this.user.ID_sucursal},'s','t','1999-10-10','1999-10-10','a',`;
      this.request.consultas(this.procedure+"0)").subscribe((res:any)=>{
        this.res = res[0];
      });
    }
  }
  buscar(){
    if (this.option == "2"){
      if(this.issuper){
        this.procedure = `CALL cvtotales('v',0,'g','f','${this.form.get('fechaini')?.value}','1999-10-10','a',`;
    
      }else{
        this.procedure = `CALL cvtotales('v',${this.user.ID_sucursal},'s','f','${this.form.get('fechaini')?.value}','1999-10-10','a',`;
    
      }
    }else if(this.option == "3"){
      if(this.issuper){
        this.procedure = `CALL cvtotales('v',0,'g','r','${this.form.get('fechaini')?.value}','${this.form.get('fechafin')?.value}','a',`;
    
      }else{
        this.procedure = `CALL cvtotales('v',${this.user.ID_sucursal},'s','r','${this.form.get('fechaini')?.value}','${this.form.get('fechafin')?.value}','a',`;
    
      }
    }else if(this.option == "4"){
      if(this.issuper){
        this.procedure = `CALL cvtotales('v',0,'g','n','1999-10-10','1999-10-10','${this.form.get('name')?.value}',`;
    
      }else{
        this.procedure = `CALL cvtotales('v',${this.user.ID_sucursal},'s','n','1999-10-10','1999-10-10','${this.form.get('name')?.value}',`;
    
      }
    }else if(this.option == "5"){
        this.procedure = `CALL cvtotales('v',${this.form.get('sucursal')?.value},'s','t','1999-10-10','1999-10-10','a',`;
    
      
      
    }
    setTimeout(()=>{
      this.element?.reinicia();
    },200)
    
  }
  change(){
    if (this.option == "1"){
      if(this.user.privilegios == "superadmin"){
        this.procedure = `CALL cvtotales('v',0,'g','t','1999-10-10','1999-10-10','a',`;
        
        this.issuper = true;
      }else{
        this.procedure = `CALL cvtotales('v',${this.user.ID_sucursal},'s','t','1999-10-10','1999-10-10','a',`;
        
      }
      setTimeout(()=>{
        this.element?.reinicia();
      },200)
    }else if( this.option=="2" ){
      this.form.controls['fechaini'].setValue("");
      this.form.controls['fechafin'].setValue("1999-10-10");
      this.form.controls['name'].setValue("example");
      this.form.controls['sucursal'].setValue("1");
      
    }else if ( this.option == "3" ){
      
      this.form.controls['fechaini'].setValue("");
      this.form.controls['fechafin'].setValue("");
      this.form.controls['name'].setValue("example");
      this.form.controls['sucursal'].setValue("1");
      
    }else if( this.option == "4" ){

      this.form.controls['fechaini'].setValue("1999-10-10");
      this.form.controls['fechafin'].setValue("1999-10-10");
      this.form.controls['name'].setValue("");
      this.form.controls['sucursal'].setValue("1");
      
    }else if ( this.option == "5"){

      this.form.controls['fechaini'].setValue("1999-10-10");
      this.form.controls['fechafin'].setValue("1999-10-10");
      this.form.controls['name'].setValue("example");
      this.form.controls['sucursal'].setValue("");
      
    }
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(){
    
  }
  result(array:any){
    this.res = array[0];
    console.log(this.res)
  }
}
