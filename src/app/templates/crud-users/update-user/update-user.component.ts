import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  bandID:boolean=true;
  bandT:boolean=true;
  user:string="";
  id_user:number=0;
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
  }

  detectID(){
    if(this.form.get('id_user')?.value==""){
      this.bandT=true
    }else{
      this.bandT=false
    }
  }

  buscar(){
    if(this.form.get('user')?.value==""){
      ///buscar por ID
      
    }else{
      //buscar por nombre

    }
  }
  ngOnInit(): void {
  }

}
