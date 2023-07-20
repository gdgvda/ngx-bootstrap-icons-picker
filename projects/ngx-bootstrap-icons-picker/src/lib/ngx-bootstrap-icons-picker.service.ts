import {Injectable} from '@angular/core';
import {BootstrapIcon} from "./ngx-bootstrap-icons-picker.model";

@Injectable(/*{providedIn: 'root'} @todo non dovrebbe servire */)
export class NgxBootstrapIconsPickerService {

  // constructor(){} @todo non dovrebbe servire

  getIcons(ipIconPacks: string[]): BootstrapIcon[] {
    const icons: BootstrapIcon[] = [];
    icons.push(new BootstrapIcon(61698,'alarm'));
    icons.push(new BootstrapIcon(61705,'alt'));
    icons.push(new BootstrapIcon(61709,'archive'));
    return icons;
  }

}
