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
* [ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap)
* [twbs-bootstrap](https://github.com/twbs/bootstrap)
* [twbs-icons](https://github.com/twbs/icons)

Versions compatibility:
* Angular 22 -> `^22.0.0`
* Angular 21 -> `^21.0.0`
* Angular 20 -> `^20.0.0`
* Angular 19 -> `^19.0.0`
* Angular 18 -> `^18.0.0`
* Angular 17 -> `^17.0.0`

_Largely inspired by [ngx-icon-picker](https://github.com/tech-advantage/ngx-icon-picker)_

## Installing and usage

Install the picker and the styles used by the default theme:

```sh
npm install ngx-bootstrap-icons-picker bootstrap bootstrap-icons
```

Load these styles globally, for example in the `styles` array of `angular.json`:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css",
  "src/styles.scss"
]
```

The bundled catalog contains the 2,078 icons from Bootstrap Icons 1.13.1. Use Bootstrap Icons 1.13.1 or newer so every icon has a matching glyph. The picker can be used with custom CSS through the style-class inputs below.

### Standalone components

```typescript
import { Component, signal } from '@angular/core';
import { NgxBootstrapIconsPickerIconPickerDirective } from 'ngx-bootstrap-icons-picker';

@Component({
  selector: 'app-example',
  imports: [NgxBootstrapIconsPickerIconPickerDirective],
  templateUrl: './example.html',
})
export class ExampleComponent {
  readonly selectedIcon = signal('terminal-fill');
}
```

```html
<div class="input-group mb-3">
  <span class="input-group-text">
    <i class="bi bi-{{ selectedIcon() }}" aria-hidden="true"></i>
  </span>
  <input type="text" class="form-control" readonly aria-label="Selected icon"
         [iconPicker]="selectedIcon()"
         [value]="selectedIcon()"
         (iconPickerSelect)="selectedIcon.set($event)" />
</div>
```

Bind `iconPicker` to the selected value so changes made by the application are reflected in the picker. The directive emits the initial icon (or the fallback) once at initialization, and emits again when an icon is selected.

### NgModule applications

The existing module remains available and exports the same directive:

```typescript
import { NgxBootstrapIconsPickerModule } from 'ngx-bootstrap-icons-picker';

@NgModule({
  imports: [NgxBootstrapIconsPickerModule],
})
export class AppModule {}
```

### Inputs and output

| Input | Default | Description |
| --- | --- | --- |
| `iconPicker` | `''` | Selected icon name; an empty initial value uses the fallback. |
| `bipWidth` | `'270px'` | Popup width in pixels. |
| `bipHeight` | `'auto'` | Popup height in pixels, or automatic height. |
| `bipMaxHeight` | `'180px'` | Maximum height of the icon list in pixels. |
| `bipIconSize` | `'18px'` | Icon size in pixels. |
| `bipIconVerticalPadding` | `'9px'` | Button top and bottom padding in pixels. |
| `bipIconHorizontalPadding` | `'9px'` | Button left and right padding in pixels. |
| `bipKeepSearchFilter` | `false` | Prefill search with the selected icon when opening, except for the fallback icon. Accepts booleans and the existing `'true'`/`'false'` strings. |
| `bipPosition` | `'bottom'` | Popup position: `'top'`, `'bottom'`, `'left'`, or `'right'`. |
| `bipFallbackIcon` | `'github'` | Icon used when the initial value is empty. |
| `bipPlaceholder` | `'Search icon..'` | Search placeholder and accessible popup/search label. |
| `bipButtonStyleClass` | `'btn btn-default'` | CSS classes for icon buttons. |
| `bipDivSearchStyleClass` | `''` | CSS classes for the search container. |
| `bipInputSearchStyleClass` | `'form-control input-sm'` | CSS classes for the search input. |

`iconPickerSelect` emits the selected icon name as a string. Changes to configuration inputs are applied to an existing popup, including while it is open.

### Keyboard and focus

Use a focusable trigger such as an input or button, with a visible label or `aria-label`. Enter or Arrow Down opens the picker and focuses search; Space also opens it on a button. Tab navigates the icon buttons. Escape closes the popup and restores focus to the trigger, as does selecting an icon. Clicking or moving focus outside closes the popup without moving focus back.

The picker supports Angular 22's default OnPush and zoneless change detection. Applications can also use it with Zone.js.

## Developers

### Maintainer

- [Manuel Zavatta](https://github.com/Zavy86)

### Contributors

- [We Want You!](https://github.com/gdgvda/ngx-bootstrap-icons-picker/blob/main/CONTRIBUTING.md)
