import {Pipe, PipeTransform} from '@angular/core';
import {BootstrapIcon} from "./ngx-bootstrap-icons-picker.model";

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(values:BootstrapIcon[],search:string):BootstrapIcon[]{
    if(!search){return values;}

    const searchValue = this.clean(search);

    return values.filter(icon => {
      let keep = false;
      if(icon.name){keep = keep || this.clean(icon.name).includes(searchValue);}
      // @todo abilitare ricerca negli alias
      //if(icon.aliases){keep = keep || icon.aliases.some(alias => this.clean(alias).includes(searchValue));}
      return keep;
    });

  }

  clean(value:string):string{
    return value.trim().toLowerCase();
  }

}
