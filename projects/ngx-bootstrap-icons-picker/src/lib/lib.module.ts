import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgxBootstrapIconsPickerService} from "./lib.service";
import {NgxBootstrapIconsPickerComponent} from './lib.component';
import {NgxBootstrapIconsPickerIconPickerDirective} from "./lib.directive";
import {TextDirective} from "./text.directive";
import {SearchPipe} from "./search.pipe";

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
    NgxBootstrapIconsPickerIconPickerDirective
  ]
})
export class NgxBootstrapIconsPickerModule { }
