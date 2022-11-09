import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe'
})
export class StatusPipe implements PipeTransform {

  transform(value: number): string {
    let estado:string = "";
    if(value == 1){
      estado="Activo";
    }else{
      estado="Inactivo";
    }
    return estado;
  }

}
