import { Component, signal } from '@angular/core';
import { NgxBootstrapIconsPickerIconPickerDirective } from 'ngx-bootstrap-icons-picker';

@Component({
  selector: 'app-root',
  imports: [NgxBootstrapIconsPickerIconPickerDirective],
  templateUrl: './app.component.html',
})
export class AppComponent {

  readonly selectedIcon = signal('terminal-fill');

  onIconPickerSelect(icon:string):void {
    this.selectedIcon.set(icon);
  }

}
