import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
import { RequestsService } from 'src/app/services/requests.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-read-sucursal',
  templateUrl: './read-sucursal.component.html',
  styleUrls: ['./read-sucursal.component.css']
})
export class ReadSucursalComponent implements OnInit {
  form!:FormGroup;
  sucursales:any[]=[];
  op:string="s.";
  option:string="";
  sql:string="SELECT s.id 'ID',concat(u.estado,' ',u.ciudad,' ',u.colonia,' ',u.cp) 'ID_ubicacion',u.cp,s.calle,s.numero,s.telefono,s.email,s.status,s.horarioap,s.horariocierre FROM sucursal s,ubicacion u WHERE s.id_ubicacion=u.id";
  sentencia:string="UPDATE sucursal SET status = ";
  @ViewChild('paginacion') element?:PaginacionComponent;
  constructor(private request:RequestsService,private router:Router) {
    this.form = new FormGroup({
      texto : new FormControl('',[Validators.required,Validators.pattern("[^\"\'|&]+")]),
      id : new FormControl('',[Validators.required,Validators.pattern("[0-9]+")])
    });
    this.request.consultas(this.sql+' LIMIT 0,11').subscribe((res:any)=>{
      this.sucursales = res;
    });
  }

  ngOnInit(): void {
  }
  result(res:any){
    this.sucursales = res;
  }
  cambio(sql:string){
    this.sql = sql;
    this.element?.update(1);
  }
  change(){
    if(this.option == "1"){
      this.sql="SELECT s.id 'ID',concat(u.estado,' ',u.ciudad,' ',u.colonia,' ',u.cp) 'ID_ubicacion',u.cp,s.calle,s.numero,s.telefono,s.email,s.status,s.horarioap,s.horariocierre FROM sucursal s,ubicacion u WHERE s.id_ubicacion=u.id";
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
      this.sql=`SELECT s.id 'ID',concat(u.estado,' ',u.ciudad,' ',u.colonia,' ',u.cp) 'ID_ubicacion',u.cp,s.calle,s.numero,s.telefono,s.email,s.status,s.horarioap,s.horariocierre FROM sucursal s,ubicacion u WHERE s.id_ubicacion=u.id and lower(concat(u.estado,u.ciudad,u.colonia,u.cp)) like '%${this.form.get('texto')?.value}%'`;
   
    }else if(this.option == "3"){
      this.sql=`SELECT s.id 'ID',concat(u.estado,' ',u.ciudad,' ',u.colonia,' ',u.cp) 'ID_ubicacion',u.cp,s.calle,s.numero,s.telefono,s.email,s.status,s.horarioap,s.horariocierre FROM sucursal s,ubicacion u WHERE s.id_ubicacion=u.id and s.id = ${this.form.get('id')?.value}`;     
      
    }else{

    }
    setTimeout(()=>{
      this.element?.reinicia();
    
    },200);
    
  }
  update(id:number){
    this.router.navigate(['/create-sucursal',id])
  }
}
