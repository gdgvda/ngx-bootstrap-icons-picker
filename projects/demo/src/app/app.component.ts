import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedIcon:string = ''

  onIconPickerSelect(icon:string):void {
    console.log(icon);
    this.selectedIcon = icon;
  }

}
