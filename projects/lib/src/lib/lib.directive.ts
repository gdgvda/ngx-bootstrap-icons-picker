import {
  booleanAttribute, ComponentRef, DestroyRef, Directive, ElementRef, EventEmitter, inject,
  Input, OnChanges, OnInit, Output, signal, ViewContainerRef,
} from '@angular/core';
import { NgxBootstrapIconsPickerComponent } from './lib.component';

let nextDialogId = 0;

@Directive({
  selector: '[iconPicker]',
  host: {
    '(click)': 'openDialog()',
    '(keydown)': 'onKeydown($event)',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'expanded()',
    '[attr.aria-controls]': 'dialogId()',
  },
})
export class NgxBootstrapIconsPickerIconPickerDirective implements OnInit, OnChanges {
  @Input() iconPicker = '';
  @Input() bipWidth = '270px';
  @Input() bipHeight = 'auto';
  @Input() bipMaxHeight = '180px';
  @Input() bipIconSize = '18px';
  @Input() bipIconVerticalPadding = '9px';
  @Input() bipIconHorizontalPadding = '9px';
  @Input({ transform: booleanAttribute }) bipKeepSearchFilter = false;
  @Input() bipPosition = 'bottom';
  @Input() bipFallbackIcon = 'github';
  @Input() bipPlaceholder = 'Search icon..';
  @Input() bipButtonStyleClass = 'btn btn-default';
  @Input() bipDivSearchStyleClass = '';
  @Input() bipInputSearchStyleClass = 'form-control input-sm';
  @Output() readonly iconPickerSelect = new EventEmitter<string>(true);

  protected readonly expanded = signal(false);
  protected readonly dialogId = signal<string | null>(null);
  private readonly vcRef = inject(ViewContainerRef);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private dialog?: ComponentRef<NgxBootstrapIconsPickerComponent>;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.dialog?.destroy();
      this.dialog = undefined;
    });
  }

  ngOnInit(): void {
    this.iconPicker = this.iconPicker || this.bipFallbackIcon || 'github';
    this.iconPickerSelect.emit(this.iconPicker);
  }

  ngOnChanges(): void {
    this.configureDialog();
  }

  onClick(): void {
    this.openDialog();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.expanded()) {
      event.preventDefault();
      event.stopPropagation();
      this.dialog?.instance.closeIconPicker(true);
    } else if (event.key === 'Enter' || event.key === 'ArrowDown'
      || (event.key === ' ' && !['INPUT', 'TEXTAREA'].includes(this.el.nativeElement.tagName))) {
      event.preventDefault();
      this.openDialog();
    }
  }

  openDialog(): void {
    if (this.destroyRef.destroyed || this.el.nativeElement.matches(':disabled, [aria-disabled="true"]')) return;
    if (!this.dialog) {
      this.dialog = this.vcRef.createComponent(NgxBootstrapIconsPickerComponent);
      const id = 'bootstrap-icon-picker-' + nextDialogId++;
      this.dialog.instance.dialogId = id;
      this.dialogId.set(id);
      this.dialog.instance.closed.subscribe(() => this.expanded.set(false));
    }
    this.configureDialog();
    this.dialog.instance.openDialog(this.iconPicker);
    this.expanded.set(this.dialog.instance.show);
  }

  iconSelected(icon: string): void {
    this.iconPicker = icon;
    this.iconPickerSelect.emit(icon);
  }

  private configureDialog(): void {
    this.dialog?.instance.configure(this, this.el, this.iconPicker, {
      position: this.bipPosition,
      height: this.bipHeight,
      maxHeight: this.bipMaxHeight,
      width: this.bipWidth,
      placeholder: this.bipPlaceholder,
      fallbackIcon: this.bipFallbackIcon,
      iconSize: this.bipIconSize,
      iconVerticalPadding: this.bipIconVerticalPadding,
      iconHorizontalPadding: this.bipIconHorizontalPadding,
      buttonStyleClass: this.bipButtonStyleClass,
      divSearchStyleClass: this.bipDivSearchStyleClass,
      inputSearchStyleClass: this.bipInputSearchStyleClass,
      keepSearchFilter: this.bipKeepSearchFilter,
    });
  }
}
