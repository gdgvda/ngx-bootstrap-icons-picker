import { Injectable } from '@angular/core';
import { allIconsList } from './bootstrap-icons';

@Injectable()
export class NgxBootstrapIconsPickerService{

  icons:string[] = [];

  constructor(){
    for(const icon in allIconsList){
      this.icons.push(icon);
    }
  }

  getIcons():string[] {
    return this.icons
  }

}
