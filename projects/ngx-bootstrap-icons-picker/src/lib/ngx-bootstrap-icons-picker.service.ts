import {Injectable} from '@angular/core';
import {BootstrapIcon} from "./ngx-bootstrap-icons-picker.model";
import {allIconsList} from "./bootstrap-icons";

@Injectable(/*{providedIn: 'root'} @todo non dovrebbe servire */)
export class NgxBootstrapIconsPickerService {

  icons:BootstrapIcon[] = [];

  constructor(){
    for(const icon in allIconsList){
      this.icons.push(new BootstrapIcon(icon));
    }
  }

  getIcons():BootstrapIcon[]{return this.icons}

}
