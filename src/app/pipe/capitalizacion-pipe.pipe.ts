import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizacion'
})
export class CapitalizacionPipePipe implements PipeTransform {

  transform(value: string, todasLetras: boolean = true): string {
    //cambiar todo a minusculas
    value = value.toLowerCase();
    //Separar a un arreglo las palabras
    let nombres = value.split(" ");
    
    if (todasLetras) {
      for (let i in nombres) {
        //Poner en mayuscula la primer letra de cada palabra
        nombres[i] = nombres[i][0].toUpperCase() + nombres[i].substr(1);
      }
    } else {
      nombres[0] = nombres[0][0].toUpperCase() + nombres[0].substr(1);
    }
    //unir todas las palabras de nuevo.
    return nombres.join(" ");
  }

}
