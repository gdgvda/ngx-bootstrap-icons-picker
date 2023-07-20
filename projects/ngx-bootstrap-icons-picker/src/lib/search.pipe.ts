import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(values:string[],search:string):string[]{
    if(!search){return values;}
    const searchValue = this.clean(search);
    return values.filter(icon=>this.clean(icon).includes(searchValue));
  }

  clean(value:string):string{
    return value.trim().toLowerCase();
  }

}
