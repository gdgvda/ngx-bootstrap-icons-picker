# Angular Bootstrap Icons Picker

* Largely inspired by [ngx-icon-picker](https://github.com/tech-advantage/ngx-icon-picker)

Angular IconPicker Directive/Component with no dependencies required.

This is an Icon Picker Directive/Component for Angular 13.3+.

The icon Picker manages Font Awesome, Bootstrap Glyphicon, Font Awesome 5 (5.15.4) and Material Icons.



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.






## Installing and usage

npm install ngx-icon-picker --save

### Load the module for your app

```typescript
import { IconPickerModule } from 'ngx-icon-picker';

@NgModule({
  ...
  imports: [
    ...
    IconPickerModule
  ]
})
```

### Use it in your HTML template

```html
<input [iconPicker]="icon" (iconPickerSelect)="onIconPickerSelect(newIcon)"/>
```

Available inputs and output :

```typescript
[iconPicker]                // The icon to select in the grid.

[ipWidth]                   // Use this option to set icon picker dialog width (default: '230px').
[ipHeight]                  // Use this option to force icon picker dialog height (default: 'auto').
[ipMaxHeight]               // Use this option to force icon picker dialog max-height (default: '200px').

[ipIconPack]                // Icon pack (Font Awesome / Font Awesome5 / Font Awesome6 / Bootstrap Glyphicon / Material / Prime): 'fa', 'fa5', 'fa6', 'bs', 'mat', 'pi', 'all' (default: ['bs', 'fa5']).
[ipIconSize]                // Set the icon size in the selector (default: '16px')
[ipIconVerticalPadding]     // Set the top and bottom padding (default: '6px') 
[ipIconHorizontalPadding]   // Set the left and right button padding (default: '10px') 
[ipKeepSearchFilter]        // The search filter keep the value to filter  (default: 'false')    

[ipFallbackIcon]            // Is used when the icon is undefined (default: 'fas fa-user').
[ipPosition]                // Dialog position: 'right', 'left', 'top', 'bottom' (default: 'right').
[ipPlaceHolder]             // Search input placeholder (default: 'Search icon...').

(iconPickerSelect)          // On selected icon value.
```

To integrate the icon picker with an another framework, you have to use the extra inputs:

```typescript
[ipButtonStyleClass]              // To override the bootstrap class for the button. Use only to change the framework
[ipDivSearchStyleClass]     // To override the bootstrap class for the div search. Use only to change the framework
[ipInputSearchStyleClass]   // To override the bootstrap class for the input search. Use only to change the framework
```

### Installing from a brand new @angular/cli project based on Bootstrap

Version of @angular/cli used is V15.0.2.

* Generate a new project (here we use LESS preprocessor): `ng new myproject --style less`
* `cd myproject`
* Update *package.json* with:

```json
      "bootstrap": "3.3.7",
      "@fortawesome/fontawesome-free": "5.15.4",
```

or with npm command:

```bash
  npm install --save bootstrap@3.3.7
  npm install --save @fortawesome/fontawesome-free@5.15.4
```

* Install dependancies: `yarn install` (or `npm install`).
* Update *styles.less* with:

```less
@import '~bootstrap/less/bootstrap.less';
@import '~@fortawesome/fontawesome-free/less/fontawesome.less';
```

* Import **IconPickerModule** in `app.module.ts` (also **CommonModule** and **ReactiveFormsModule**):

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { IconPickerModule } from 'ngx-icon-picker/dist/index';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    IconPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

* Update the template `app.component.html`:

```html
<div class="container">
  <div [formGroup]="myFormGroup">
    <label>Icon</label>
    <div class="input-group">
        <span class="input-group-addon"><i [ngClass]="iconCss.value"></i></span>
        <input type="text" name="iconCss" class="form-control"
               formControlName="iconCss"
               [iconPicker]="iconCss.value"
               [ipPosition]="'bottom'"
               [ipWidth]="'250px'"
               [ipIconSize]="'16px'"
               [ipIconVerticalPadding]="'6px'"
               [ipIconHorizontalPadding]="'10px'"
               [ipKeepSearchFilter]="'false'"
               [ipPlaceHolder]="'Choose an icon'"
               [ipFallbackIcon]="fallbackIcon"
               (iconPickerSelect)="onIconPickerSelect($event)"/>
      </div>
  </div>
</div>
```

**Note**: A class for the icon button can be define to override the CSS: `ip-button-icon`

* Update the component `app.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.less']
})
export class AppComponent implements OnInit {
  myFormGroup: FormGroup;
  iconCss = new FormControl();
  fallbackIcon = 'fas fa-user';

  ngOnInit(): void {
    this.myFormGroup = new FormGroup({iconCss: this.iconCss});
  }

  onIconPickerSelect(icon: string): void {
    this.iconCss.setValue(icon);
  }
}
```

* Start your project with `yarn start` (or `npm start`) and go to _localhost:4200_

[demo_01](https://github.com/tech-advantage/ngx-icon-picker/blob/master/doc/demo_01.jpg)

* You should now be able to change icon by clicking input field :

![demo_02](https://github.com/tech-advantage/ngx-icon-picker/blob/master/doc/demo_02.jpg)

![demo_03](https://github.com/tech-advantage/ngx-icon-picker/blob/master/doc/demo_03.jpg)

![demo_04](https://github.com/tech-advantage/ngx-icon-picker/blob/master/doc/demo_04.jpg)

## Examples

To run the example or to validate your development with the example, you have to build the library:

```bash
npm install
npm run build
```
3 examples are available:

* app : based on bootstrap usage. It's the framework used to design the icon picker.
* app-bulma : based on bulma framework
* app-semantic : based on semantic framework.

### app

**app** is the default application based on boostrap. You will find a multiple of example tu use the icon picker.

To start the server:

```bash
npm start
```

go to _localhost:4200_

Source are availble in **projects/app**


To start the server:

```bash
npm run start-semantic
```

go to _localhost:4200_

Source are availble in **projects/app-semantic**

## How do I test in my own project?

After cloning this repository and modify the source, to test this libary with a local build, you have to type :

```bash
npm install 
npm run build
```

The library will be build

Go in your project and type `npm install NGX_ICON_PICKER_PATCH` where **NGX_ICON_PICKER_PATCH** is the ngx-icon-picker path repository (example: /git/ngx-icon-picker).

The local build will be installed in your project.

## Build the library for production

Edit version in package.json (root and lib).
Duplicate the README.md files

```bash
npm install
ng lint
npm run prepare
npm run publish
```

Source are available in **projects/lib**

## Contributors

Manuel Zavatta
