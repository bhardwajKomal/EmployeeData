import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'packageFormat'
})
export class PackageFormatPipe implements PipeTransform {

  transform(value:number): string {
    if(value>=100000){
      return '₹' + (value/100000).toFixed(2) + 'L';
    }else{
      return '₹' + value.toFixed(2);
    }
    return null;
  }

}
