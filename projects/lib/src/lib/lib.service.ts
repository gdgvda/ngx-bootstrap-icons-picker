import { Injectable } from '@angular/core';
import { allIconsList } from './bootstrap-icons';

@Injectable({ providedIn: 'root' })
export class NgxBootstrapIconsPickerService {
  readonly icons = Object.keys(allIconsList);

  getIcons(): string[] {
    return this.icons;
  }
}
