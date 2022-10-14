import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!:FormGroup; 
  constructor() { 
    this.form = new FormGroup({
      'nombre':new FormControl('',[Validators.pattern('[^\'\"°!|&]+')]),
      'appat':new FormControl('',[]),
      'apmat':new FormControl('',[]),
      'password':new FormControl('',[]),
      'email':new FormControl('',[]),
      'privilegios':new FormControl('',[]),
      'sucursal':new FormControl('',[])
      
    });
  }

  ngOnInit(): void {
  }

}
