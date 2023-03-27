import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'packageFormat'
})
export class PackageFormatPipe implements PipeTransform {

  transform(data:number): string {
    if(data>=100000){
      return '₹' + (data/100000).toFixed(2) + 'L';
    }else{
      return '₹' + data.toFixed(2);
    }
    
  }

}
