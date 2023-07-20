import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgxBootstrapIconsPickerService} from "./ngx-bootstrap-icons-picker.service";
import {NgxBootstrapIconsPickerComponent} from './ngx-bootstrap-icons-picker.component';
import {NgxBootstrapIconsPickerIconPickerDirective} from "./ngx-bootstrap-icons-picker.iconPicker.directive";
import {TextDirective} from "./ngx-bootstrap-icons-picker.text.directive";
import {SearchPipe} from "./ngx-bootstrap-icons-picker.search.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    NgxBootstrapIconsPickerService
  ],
  declarations: [
    NgxBootstrapIconsPickerComponent,
    NgxBootstrapIconsPickerIconPickerDirective,
    TextDirective,
    SearchPipe
  ],
  exports: [
    //NgxBootstrapIconsPickerComponent @todo non dovrebbe servire
    NgxBootstrapIconsPickerIconPickerDirective
  ]
})
export class NgxBootstrapIconsPickerModule { }
