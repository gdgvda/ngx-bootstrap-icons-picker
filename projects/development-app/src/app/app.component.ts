import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedIcon:string = ''
  fallbackIconDefault:string = '0-circle';

  ngOnInit(): void {

  }

  onIconPickerSelect(icon:string):void {
    console.log(icon);
    //this.iconCssDefault.setValue(icon);
    this.selectedIcon = icon;
  }

}
