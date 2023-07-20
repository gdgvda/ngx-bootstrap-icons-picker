import {Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewContainerRef} from '@angular/core';
import {NgxBootstrapIconsPickerComponent} from './lib.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[iconPicker]'
})
export class NgxBootstrapIconsPickerIconPickerDirective implements OnInit, OnChanges {

  @Input() iconPicker = ''
  @Input() bipPlaceholder = 'Search icon...';
  @Input() bipPosition = 'right';
  @Input() bipFallbackIcon = 'github';
  @Input() bipHeight = 'auto';
  @Input() bipMaxHeight = '200px';
  @Input() bipWidth = '230px';
  @Input() bipIconSize = '18px';
  @Input() bipIconVerticalPadding = '6px';
  @Input() bipIconHorizontalPadding = '9px';
  @Input() bipKeepSearchFilter = 'false';
  @Input() bipButtonStyleClass = 'btn btn-default';
  @Input() bipInputSearchStyleClass = 'form-control input-sm';
  @Input() bipDivSearchStyleClass = '';

  @Output() iconPickerSelect = new EventEmitter<string>(true);

  private dialog: any;
  private created: boolean;
  private ignoreChanges = false;

  constructor(
    private vcRef: ViewContainerRef,
    private el: ElementRef
  ){
    this.created = false;
  }

  @HostListener('click')
  onClick() {
    this.openDialog();
  }

  ngOnChanges(changes: any): void {
    if (changes.iconPicker) {
      this.ignoreChanges = false;
    }
  }

  ngOnInit() {
    this.iconPicker = this.iconPicker || this.bipFallbackIcon || 'fa fa-user-plus';
    this.iconPickerSelect.emit(this.iconPicker);
  }

  openDialog() {
    if (!this.created) {
      this.created = true;
      const vcRef = this.vcRef;
      const cmpRef = vcRef.createComponent(NgxBootstrapIconsPickerComponent);
      cmpRef.instance.setDialog(this, this.el, this.iconPicker, this.bipPosition, this.bipHeight, this.bipMaxHeight,
        this.bipWidth, this.bipPlaceholder, this.bipFallbackIcon, this.bipIconSize,
        this.bipIconVerticalPadding, this.bipIconHorizontalPadding, this.bipButtonStyleClass, this.bipDivSearchStyleClass,
        this.bipInputSearchStyleClass, this.bipKeepSearchFilter);
      this.dialog = cmpRef.instance;

      if (this.vcRef !== vcRef) {
        cmpRef.changeDetectorRef.detectChanges();
      }
    } else if (this.dialog) {
      this.dialog.openDialog(this.iconPicker);
    }
  }

  iconSelected(icon: string) {
    this.iconPickerSelect.emit(icon);
  }

}
