import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number): any {

    if (!value) return value;

    let strValue = value.toString();

    let formattedValue = strValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return formattedValue;
  }

}
