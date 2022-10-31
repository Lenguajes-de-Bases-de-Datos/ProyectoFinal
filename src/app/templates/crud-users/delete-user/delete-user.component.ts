import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

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

  constructor() {
    this.form= new UntypedFormGroup({
      user: new UntypedFormControl('',[Validators.pattern(/^[a-zA-Z\\ ]+$/)]),
      id_user: new UntypedFormControl('',Validators.pattern(/^[^\.\\ ]+$/))
    });
    
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
    
  }

  ngOnInit(): void {
  }

}
