import { NgModule } from '@angular/core';
import { NgxBootstrapIconsPickerIconPickerDirective } from './lib.directive';

/** Compatibility entry point for applications that import the picker as an NgModule. */
@NgModule({
  imports: [NgxBootstrapIconsPickerIconPickerDirective],
  exports: [NgxBootstrapIconsPickerIconPickerDirective],
})
export class NgxBootstrapIconsPickerModule {}
