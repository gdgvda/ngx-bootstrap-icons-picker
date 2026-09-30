import {Directive,EventEmitter,HostListener,Input,Output} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[text]',
  standalone: false
})
export class TextDirective{

  @Output() newValue:EventEmitter<any> = new EventEmitter<any>();

  @Input() text: any;

  @HostListener('input',['$event'])

  changeInput(event:Event):void {
    const value = (event.target as HTMLInputElement | null)?.value;
    if(value !== undefined) {
      this.newValue.emit(value);
    }
  }

}
