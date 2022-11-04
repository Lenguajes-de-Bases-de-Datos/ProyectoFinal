import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  path:string="http://localhost:3000";
  sucursal!:number;
  constructor(private request:HttpClient) { }

  insert(a:String,params:any):any{
    let token = sessionStorage.getItem('token');
    if(token == null) token=""
    let headers = new HttpHeaders().set('crazys',token);
    console.log(this.path+a,params);
    return this.request.post(this.path+a,params,{headers:headers});
  }
  accion(body:any){
    let token = sessionStorage.getItem('token');
    if(token == null) token="";
    let headers = new HttpHeaders().set('crazys',token);
    return this.request.post(this.path+'/accion',body,{headers:headers});
    
  }
  consultas(pet:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("sql",pet);
    
    //header
    let token = sessionStorage.getItem('token');
    if(token == null) token="";
    let headers = new HttpHeaders().set('crazys',token);
    
    
    return this.request.get(this.path+'/consultas',{ params: queryParams,headers:headers });
  
  }
  ReadSucursal(a:String):any{
    let token = sessionStorage.getItem('token');
    if(token == null) token=""
    let headers = new HttpHeaders().set('crazys',token);
    return this.request.get(this.path+a,{headers:headers});
  }
  logIn(params:any):any{

    return this.request.post("http://localhost:3000/login",params,{responseType: 'json'});
  }
  verifyToken(){
    
    let token = sessionStorage.getItem('token');
    if(token == null) token=""
    let headers = new HttpHeaders().set('crazys',token);
    return this.request.get(this.path+'/validate',{headers:headers});
  }

  readUsuarios(a:string,params:any):any{
    let token = sessionStorage.getItem('token');
    if(token == null) token = '';
    let headers = new HttpHeaders().set('crazys',token);
    console.log(this.path+a,params);
    return this.request.post(this.path+a,params,{headers:headers});
  }
}
