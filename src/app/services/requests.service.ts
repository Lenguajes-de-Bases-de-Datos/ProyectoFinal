import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  path:string="http://localhost:3000";
  constructor(private request:HttpClient) { }


  logIn(params:any):any{

    return this.request.post("http://localhost:3000/login",params,{responseType: 'json'});
  }
}
