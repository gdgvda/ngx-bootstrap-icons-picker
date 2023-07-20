# Angular Bootstrap Icons Picker

> By **G**oogle **D**evelopers **G**roup [Valle d'Aosta](https://gdg.community.dev/gdg-valle-daosta/)

_Largely inspired by [ngx-icon-picker](https://github.com/tech-advantage/ngx-icon-picker)_

Angular Bootstrap Icons Picker for:
* [ng-booxtrap](https://github.com/ng-bootstrap/ng-bootstrap)
* [twbs-bootstrap](https://github.com/twbs/bootstrap)
* [twbs-icons](https://github.com/twbs/icons)

Tested with:
* Angular 14

This icon picker manages the free, high quality, open source [Bootstrap Icons](https://icons.getbootstrap.com/) library.

## Installing and usage

`npm install ngx-bootstrap-icons-picker --save`

### Load the module for your app

```typescript
import {NgxBootstrapIconsPickerModule} from "ngx-bootstrap-icons-picker";

@NgModule({
    ...
    imports:[
        ...
        NgxBootstrapIconsPickerModule
    ]
})
```

### Use it in your template

```html
<input type="text" class="form-control"
       [iconPicker]="'terminal-fill'"
       [ipPosition]="'bottom'"
       [ipWidth]="'270px'"
       [ipPlaceHolder]="'Search'"
       [ipFallbackIcon]="fallbackIconDefault"
       [value]="selectedIcon"
       (iconPickerSelect)="onIconPickerSelect($event)"
/>
```
### Component property and methods

```html
export class AppComponent {
  selectedIcon:string = ''
  fallbackIconDefault:string = '0-circle';

  onIconPickerSelect(icon:string):void{
    this.selectedIcon = icon;
  }
}
```

Available inputs and output :

```typescript
[iconPicker]                // The icon to select in the grid.

[bipWidth]                  // Use this option to set icon picker dialog width (default:'270px')
[bipHeight]                 // Use this option to force icon picker dialog height (default:'auto')
[bipMaxHeight]              // Use this option to force icon picker dialog max-height (default:'180px')

[bipIconSize]               // Set the icon size in the selector (default:'18px')
[bipIconVerticalPadding]    // Set the top and bottom padding (default:'6px') 
[bipIconHorizontalPadding]  // Set the left and right button padding (default:'9px') 
[bipKeepSearchFilter]       // The search filter keep the value to filter (default:'false')    

[ipPosition]                // Dialog position: 'right', 'left', 'top', 'bottom'(default: 'bottom')
[ipFallbackIcon]            // Is used when the icon is undefined (default:'github')
[ipPlaceHolder]             // Search input placeholder (default:'Search icon..')

(iconPickerSelect)          // Event on selected icon value change
```

To integrate the icon picker with another framework instead of bootstrap, you have to use the extra inputs:

```typescript
[bipButtonStyleClass]       // To override the bootstrap class for the button
[bipDivSearchStyleClass]    // To override the bootstrap class for the div search
[bipInputSearchStyleClass]  // To override the bootstrap class for the input search
```

## Contributors

- [Manuel Zavatta](https://github.com/Zavy86)
