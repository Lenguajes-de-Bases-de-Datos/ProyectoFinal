import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-user-compra',
  templateUrl: './user-compra.component.html',
  styleUrls: ['./user-compra.component.css']
})
export class UserCompraComponent implements OnInit {
  procedure:string="CALL cvtotales('c',0,'g',";
  res:any[]=[];
  user:any;
  constructor(private request:RequestsService) { 
    this.user = localStorage.getItem('cuenta');
    this.user = JSON.parse(this.user);
    if(this.user.privilegios == "superadmin"){
      this.request.consultas(this.procedure+"0)").subscribe((res:any)=>{
        this.res = res[0];
        console.log(this.res);
      });
    }else{
      this.procedure = `CALL cvtotales('c',${this.user.ID_sucursal},'s',`;
      this.request.consultas(this.procedure+"0)").subscribe((res:any)=>{
        this.res = res[0];
        console.log(this.res);
      });
    }
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    
  }
  result(array:any){
    this.res = array;
  }
}
