import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  bandID:boolean=true;
  bandT:boolean=true;
  user:string="";
  id_user:number=0;
  nom:string="";
  form!:UntypedFormGroup;
  vecUser:any[]=[];

  constructor(private request:RequestsService) {
    this.form= new UntypedFormGroup({
      user: new UntypedFormControl('',[Validators.pattern(/^[a-zA-Z\\ ]+$/)]),
      id_user: new UntypedFormControl('',Validators.pattern(/^[^\.\\ ]+$/))
    });
    
  }

  petiRecupUs(){
    let params={
      nombre:this.form.get('user')?.value,
      id:this.form.get('id_user')?.value
    }

    console.log(params);

    this.request.readUsuarios('/readUser',params).subscribe({next:(res:any)=>{
      if(res.band){
        swal.fire({
          allowOutsideClick: true,
          title: "Exito...",
          text: "Consulta de Usuario(s) exitosamente...",
          confirmButtonText:'Entendido'
        });
        //this.vecUser=res.resultado;
        this.bandID=true;
        this.bandT=true;
        this.form.reset();
        //console.log(this.vecUser);
      }else{
        swal.fire({
          allowOutsideClick: true,
          title: "Error ...",
          text: "No se pudo consultar Usuario(s)...",
          confirmButtonText:'Entendido'
        });
      }
     },
     error:(res:any)=>{
      swal.fire({
        allowOutsideClick: true,
        title: "Error ...",
        text: "No se pudo consultar Usuario(s)...",
        confirmButtonText:'Entendido'
      });
     }});

  }

  detectT(){
    if(this.form.get('user')?.value==""){
      this.bandID=true
    }else{
      this.bandID=false
    }
    //this.nom=this.form.get('user')?.value;
  }

  detectID(){
    //this.num=this.form.get('id_user')?.value;
    if(this.form.get('id_user')?.value==""){
      this.bandT=true
    }else{
      this.bandT=false
    }
  }

  buscar(){
    this.petiRecupUs();
  }

  ngOnInit(): void {
  }

}
