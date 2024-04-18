import {
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewContainerRef
} from '@angular/core';
import { NgxBootstrapIconsPickerComponent } from './lib.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[iconPicker]'
})
export class NgxBootstrapIconsPickerIconPickerDirective implements OnInit,OnChanges {

  @Input() iconPicker:string = ''

  @Input() bipWidth:string = '270px';
  @Input() bipHeight:string = 'auto';
  @Input() bipMaxHeight:string = '180px';

  @Input() bipIconSize:string = '18px';
  @Input() bipIconVerticalPadding:string = '9px';
  @Input() bipIconHorizontalPadding:string = '9px';
  @Input() bipKeepSearchFilter:string = 'false';

  @Input() bipPosition:string = 'bottom';
  @Input() bipFallbackIcon:string = 'github';
  @Input() bipPlaceholder:string = 'Search icon..';

  @Input() bipButtonStyleClass:string = 'btn btn-default';
  @Input() bipDivSearchStyleClass:string = '';
  @Input() bipInputSearchStyleClass:string = 'form-control input-sm';

  @Output() iconPickerSelect:EventEmitter<string> = new EventEmitter<string>(true);

  private dialog:any;
  private created:boolean;
  private ignoreChanges:boolean = false;

  constructor(
    private vcRef:ViewContainerRef,
    private el:ElementRef
  ) {
    this.created = false;
  }

  @HostListener('click')
  onClick():void {
    this.openDialog();
  }

  ngOnChanges(changes:any):void {
    if(changes.iconPicker) {
      this.ignoreChanges = false;
    }
  }

  ngOnInit():void {
    this.iconPicker = this.iconPicker || this.bipFallbackIcon || 'fa fa-user-plus';
    this.iconPickerSelect.emit(this.iconPicker);
  }

  openDialog():void {
    if( ! this.created) {
      this.created = true;
      const vcRef:ViewContainerRef = this.vcRef;
      const cmpRef:ComponentRef<NgxBootstrapIconsPickerComponent> = vcRef.createComponent(NgxBootstrapIconsPickerComponent);
      cmpRef.instance.setDialog(
        this,
        this.el,
        this.iconPicker,
        this.bipPosition,
        this.bipHeight,
        this.bipMaxHeight,
        this.bipWidth,
        this.bipPlaceholder,
        this.bipFallbackIcon,
        this.bipIconSize,
        this.bipIconVerticalPadding,
        this.bipIconHorizontalPadding,
        this.bipButtonStyleClass,
        this.bipDivSearchStyleClass,
        this.bipInputSearchStyleClass,
        this.bipKeepSearchFilter
      );
      this.dialog = cmpRef.instance;
      if(this.vcRef !== vcRef){ cmpRef.changeDetectorRef.detectChanges(); }
    } else if(this.dialog) {
      this.dialog.openDialog(this.iconPicker);
    }
  }

  iconSelected(icon:string):void {
    this.iconPickerSelect.emit(icon);
  }

}
