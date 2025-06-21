import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value === null || value=== undefined || value === '') {
      return 'N/A'; // Return a default value if the input is null, undefined, or empty
    }else{
      return value; // Return the original value if it is valid
    }
  }

}
