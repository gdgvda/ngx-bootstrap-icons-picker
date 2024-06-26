# Angular Bootstrap Icons Picker

> By **G**oogle **D**evelopers **G**roup [Valle d'Aosta](https://gdg.community.dev/gdg-valle-daosta/)

[![demo](https://img.shields.io/badge/Demo-Live-green)](https://gdgvda.github.io/ngx-bootstrap-icons-picker/)
[![github](https://img.shields.io/badge/Source%20Code-GitHub-blue)](https://github.com/gdgvda/ngx-bootstrap-icons-picker)
[![npm](https://img.shields.io/badge/Package-NPM-red)](https://www.npmjs.com/package/ngx-bootstrap-icons-picker)
[![no-ai](https://img.shields.io/badge/Coded%20by%20humans-100%25-pink)](#)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gdgvda_ngx-bootstrap-icons-picker&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=gdgvda_ngx-bootstrap-icons-picker)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=gdgvda_ngx-bootstrap-icons-picker&metric=bugs)](https://sonarcloud.io/summary/new_code?id=gdgvda_ngx-bootstrap-icons-picker)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=gdgvda_ngx-bootstrap-icons-picker&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=gdgvda_ngx-bootstrap-icons-picker)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=gdgvda_ngx-bootstrap-icons-picker&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=gdgvda_ngx-bootstrap-icons-picker)

This icon picker manages the free, high quality, open source [Bootstrap Icons](https://icons.getbootstrap.com/) library.

![screenshot.jpg](https://raw.githubusercontent.com/gdgvda/ngx-bootstrap-icons-picker/main/screenshot.jpg)

Angular Bootstrap Icons Picker for:
* [ng-booxtrap](https://github.com/ng-bootstrap/ng-bootstrap)
* [twbs-bootstrap](https://github.com/twbs/bootstrap)
* [twbs-icons](https://github.com/twbs/icons)

Versions compatibility:
* Angular 17 -> `^17.0.0`
* Angular 16 -> `@todo`
* Angular 15 -> `@todo`
* Angular 14 -> `^14.0.0`

_Largely inspired by [ngx-icon-picker](https://github.com/tech-advantage/ngx-icon-picker)_

## Installing and usage

With Angular CLI

`ng add ngx-bootstrap-icons-picker`

Or with NPM

`npm install ngx-bootstrap-icons-picker --save`

### Load the module for your app

```typescript
import {NgxBootstrapIconsPickerModule} from "ngx-bootstrap-icons-picker";

@NgModule({
  // ...
  imports: [
    // ...
    NgxBootstrapIconsPickerModule
  ]
})
```

### Use it in your template

```html
<div class="input-group mb-3">
  <span class="input-group-text"><i class="bi bi-{{selectedIcon}}"></i></span>
  <input type="text" class="form-control"
         [iconPicker]="'terminal-fill'"
         [value]="selectedIcon"
         (iconPickerSelect)="onIconPickerSelect($event)"
  />
</div>
```
### Component property and methods

```typescript
export class AppComponent {
  selectedIcon:string = ''

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

  [bipPosition]               // Dialog position: 'right', 'left', 'top', 'bottom'(default: 'bottom')
  [bipFallbackIcon]           // Is used when the icon is undefined (default:'github')
  [bipPlaceHolder]            // Search input placeholder (default:'Search icon..')

  (iconPickerSelect)          // Event on selected icon value change
```

To integrate the icon picker with another framework instead of bootstrap, you have to use the extra inputs:

```typescript
  [bipButtonStyleClass]       // To override the bootstrap class for the button
  [bipDivSearchStyleClass]    // To override the bootstrap class for the div search
  [bipInputSearchStyleClass]  // To override the bootstrap class for the input search
```

## Developers

### Maintainer

- [Manuel Zavatta](https://github.com/Zavy86)

### Contributors

- [We Want You!](https://github.com/gdgvda/ngx-bootstrap-icons-picker/blob/main/CONTRIBUTING.md)
