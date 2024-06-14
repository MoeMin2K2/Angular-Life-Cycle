import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperFirstCharacter',
  standalone: true
})
export class CustomPipePipe implements PipeTransform {

  transform(value: string): string {
    console.log("Value", !value);
    console.log("Value", value);
    if (!value) { return value; }
    else {
      return value.replace(/\b\w/g, (char: string) => char.toUpperCase());
    }
  }
}
