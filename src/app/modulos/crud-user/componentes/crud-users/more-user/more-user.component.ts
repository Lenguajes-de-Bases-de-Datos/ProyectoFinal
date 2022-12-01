import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-more-user',
  templateUrl: './more-user.component.html',
  styleUrls: ['./more-user.component.css']
})
export class MoreUserComponent implements OnInit {
  user:any;
  ID:number | undefined;
  path:string = "../../../../../../assets/img/";
  /**@Output() SendDatas = new EventEmitter<number>();
  @Input() id:number | undefined;**/
  constructor(private request:RequestsService,private router:Router, private rutaActiva: ActivatedRoute) { 
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.ID= params['ID'];
      }
    );
    let sql=`SELECT * FROM usuario WHERE ID=${this.ID}`;
    this.request.consultas(sql).subscribe((res:any)=>{
      this.user = res[0];
      this.path += this.user.imagen;
    });;
  }

  ngOnInit(): void {
  }

  regresar(){
    this.router.navigate(['/read-users']);
  }
}
