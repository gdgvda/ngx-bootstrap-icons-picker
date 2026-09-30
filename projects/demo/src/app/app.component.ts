import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
})
export class AppComponent {

  selectedIcon:string = ''

  onIconPickerSelect(icon:string):void {
    console.log(icon);
    this.selectedIcon = icon;
  }

}
