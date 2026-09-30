import { DOCUMENT } from '@angular/common';
import {
  AfterRenderRef, afterNextRender, booleanAttribute, ChangeDetectorRef, Component, DestroyRef,
  ElementRef, inject, Injector, OnInit, output, ViewChild,
} from '@angular/core';
import { NgxBootstrapIconsPickerService } from './lib.service';
import { SearchPipe } from './search.pipe';

export interface IconPickerOptions {
  position: string;
  height: string;
  maxHeight: string;
  width: string;
  placeholder: string;
  fallbackIcon: string;
  iconSize: string;
  iconVerticalPadding: string;
  iconHorizontalPadding: string;
  buttonStyleClass: string;
  divSearchStyleClass: string;
  inputSearchStyleClass: string;
  keepSearchFilter: boolean;
}

interface PickerTrigger {
  iconSelected(icon: string): void;
}

interface ElementBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

@Component({
  selector: 'lib-ngx-bootstrap-icons-picker',
  imports: [SearchPipe],
  templateUrl: './lib.component.html',
  styleUrl: './lib.component.scss',
  host: { '(keydown.escape)': 'onEscape($event)' },
})
export class NgxBootstrapIconsPickerComponent implements OnInit {
  @ViewChild('dialogPopup') dialogElement?: ElementRef<HTMLDivElement>;
  @ViewChild('searchInput') private searchInput?: ElementRef<HTMLInputElement>;

  readonly closed = output<void>();
  dialogId = '';
  ipPosition = 'bottom';
  ipHeight: number | null = null;
  ipMaxHeight = 180;
  ipWidth = 270;
  ipIconSize = 18;
  ipIconVerticalPadding = 9;
  ipIconHorizontalPadding = 9;
  ipButtonStyleClass = 'btn btn-default';
  ipInputSearchStyleClass = 'form-control input-sm';
  ipDivSearchStyleClass = '';
  ipKeepSearchFilter = false;
  ipPlaceHolder = 'Search icon..';
  ipFallbackIcon = 'github';

  show = false;
  hidden = false;
  top = 0;
  left = 0;
  position = 'absolute';
  arrowTop: number | null = null;
  selectedIcon = '';
  buttonWidth = 36;
  buttonHeight = 36;
  readonly icons = inject(NgxBootstrapIconsPickerService).getIcons();
  search = '';

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;
  private readonly dialogArrowSize = 10;
  private directiveInstance?: PickerTrigger;
  private directiveElementRef?: ElementRef<HTMLElement>;
  private initialIcon = '';
  private pendingRender?: AfterRenderRef;
  private focusPending = false;

  private readonly listenerMouseDown = (event: MouseEvent): void => this.onMouseDown(event);
  private readonly listenerResize = (): void => this.onResize();
  private readonly listenerFocus = (event: FocusEvent): void => {
    if (!this.containsTarget(event.target)) this.closeIconPicker();
  };

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.pendingRender?.destroy();
      this.removeListeners();
    });
  }

  ngOnInit(): void {
    if (this.directiveElementRef && !this.show) this.openDialog(this.initialIcon);
  }

  configure(instance: PickerTrigger, elementRef: ElementRef<HTMLElement>, icon: string, options: IconPickerOptions): void {
    const resetSelection = !this.directiveElementRef || icon !== this.initialIcon
      || options.keepSearchFilter !== this.ipKeepSearchFilter;
    this.directiveInstance = instance;
    this.directiveElementRef = elementRef;
    this.ipPosition = ['top', 'bottom', 'left', 'right'].includes(options.position) ? options.position : 'bottom';
    this.ipHeight = this.pixels(options.height, null);
    this.ipMaxHeight = this.pixels(options.maxHeight, 180);
    this.ipWidth = this.pixels(options.width, elementRef.nativeElement.offsetWidth);
    this.ipIconSize = this.pixels(options.iconSize, 18);
    this.ipIconVerticalPadding = this.pixels(options.iconVerticalPadding, 9);
    this.ipIconHorizontalPadding = this.pixels(options.iconHorizontalPadding, 9);
    this.ipKeepSearchFilter = options.keepSearchFilter;
    this.ipPlaceHolder = options.placeholder;
    this.ipFallbackIcon = options.fallbackIcon;
    this.ipButtonStyleClass = options.buttonStyleClass;
    this.ipDivSearchStyleClass = options.divSearchStyleClass;
    this.ipInputSearchStyleClass = options.inputSearchStyleClass;
    this.buttonHeight = this.ipIconSize + 2 * this.ipIconVerticalPadding;
    this.buttonWidth = this.ipIconSize + 2 * this.ipIconHorizontalPadding;
    if (resetSelection) this.setInitialIcon(icon);
    this.cdr.markForCheck();
    if (this.show) this.schedulePosition();
  }

  /** @deprecated Use configure() with an IconPickerOptions object. */
  setDialog(
    instance: PickerTrigger, elementRef: ElementRef<HTMLElement>, icon: string,
    ipPosition: string, ipHeight: string, ipMaxHeight: string, ipWidth: string,
    ipPlaceHolder: string, ipFallbackIcon: string, ipIconSize: string,
    ipIconVerticalPadding: string, ipIconHorizontalPadding: string,
    ipButtonStyleClass: string, ipDivSearchStyleClass: string,
    ipInputSearchStyleClass: string, ipKeepSearchFilter: string | boolean,
  ): void {
    this.configure(instance, elementRef, icon, {
      position: ipPosition, height: ipHeight, maxHeight: ipMaxHeight, width: ipWidth,
      placeholder: ipPlaceHolder, fallbackIcon: ipFallbackIcon, iconSize: ipIconSize,
      iconVerticalPadding: ipIconVerticalPadding, iconHorizontalPadding: ipIconHorizontalPadding,
      buttonStyleClass: ipButtonStyleClass, divSearchStyleClass: ipDivSearchStyleClass,
      inputSearchStyleClass: ipInputSearchStyleClass, keepSearchFilter: booleanAttribute(ipKeepSearchFilter),
    });
  }

  setInitialIcon(icon: string): void {
    this.initialIcon = icon;
    this.selectedIcon = this.icons.includes(icon) ? icon : '';
    this.search = this.ipKeepSearchFilter && this.selectedIcon !== this.ipFallbackIcon ? this.selectedIcon : '';
    this.cdr.markForCheck();
  }

  openDialog(icon: string): void {
    this.setInitialIcon(icon);
    this.openIconPicker();
  }

  setSearch(value: string): void {
    this.search = value;
    this.cdr.markForCheck();
    if (this.show) this.schedulePosition();
  }

  selectIcon(icon: string): void {
    this.selectedIcon = icon;
    this.directiveInstance?.iconSelected(icon);
    this.closeIconPicker(true);
  }

  onMouseDown(event: MouseEvent): void {
    if (!this.containsTarget(event.target)) this.closeIconPicker();
  }

  onEscape(event: Event): void {
    if (!this.show) return;
    event.preventDefault();
    event.stopPropagation();
    this.closeIconPicker(true);
  }

  openIconPicker(): void {
    if (this.show || !this.window || !this.directiveElementRef || this.destroyRef.destroyed) return;
    this.show = true;
    this.hidden = true;
    this.document.addEventListener('mousedown', this.listenerMouseDown);
    this.document.addEventListener('focusin', this.listenerFocus);
    this.window.addEventListener('resize', this.listenerResize);
    this.window.addEventListener('scroll', this.listenerResize, true);
    this.schedulePosition(true);
  }

  closeIconPicker(restoreFocus = false): void {
    if (!this.show) return;
    this.pendingRender?.destroy();
    this.pendingRender = undefined;
    this.focusPending = false;
    this.removeListeners();
    this.show = false;
    this.hidden = false;
    this.cdr.markForCheck();
    this.closed.emit();
    if (restoreFocus) this.directiveElementRef?.nativeElement.focus({ preventScroll: true });
  }

  onResize(): void {
    if (this.show) this.schedulePosition();
  }

  setDialogPosition(): void {
    const popup = this.dialogElement?.nativeElement;
    const trigger = this.directiveElementRef?.nativeElement;
    if (!popup || !trigger || !this.window) return;
    const box = trigger.getBoundingClientRect();
    const parent = popup.offsetParent as HTMLElement | null;
    let originTop = -this.window.scrollY;
    let originLeft = -this.window.scrollX;
    if (parent && (parent !== this.document.body || this.window.getComputedStyle(parent).position !== 'static')) {
      const parentBox = parent.getBoundingClientRect();
      originTop = parentBox.top + parent.clientTop - parent.scrollTop;
      originLeft = parentBox.left + parent.clientLeft - parent.scrollLeft;
    }
    this.position = 'absolute';
    this.top = box.top - originTop;
    this.left = box.left - originLeft;
    this.arrowTop = null;
    switch (this.ipPosition) {
      case 'left':
        this.left -= popup.offsetWidth + this.dialogArrowSize - 2;
        break;
      case 'top':
        this.top -= popup.offsetHeight + this.dialogArrowSize;
        this.arrowTop = popup.offsetHeight - 1;
        break;
      case 'right':
        this.left += box.width + this.dialogArrowSize - 2;
        break;
      default:
        this.top += box.height + this.dialogArrowSize;
    }
    this.cdr.markForCheck();
  }

  isDescendant(parent: Node, child: Node): boolean {
    return parent.contains(child);
  }

  createBox(element: HTMLElement, offset: boolean): ElementBox {
    const box = element.getBoundingClientRect();
    return {
      top: box.top + (offset ? this.window?.scrollY ?? 0 : 0),
      left: box.left + (offset ? this.window?.scrollX ?? 0 : 0),
      width: element.offsetWidth,
      height: element.offsetHeight,
    };
  }

  private containsTarget(target: EventTarget | null): boolean {
    if (!target || !('nodeType' in target)) return false;
    return this.el.nativeElement.contains(target as Node)
      || !!this.directiveElementRef?.nativeElement.contains(target as Node);
  }

  private schedulePosition(focusSearch = false): void {
    this.focusPending ||= focusSearch;
    this.pendingRender?.destroy();
    // [hidden] and size bindings must reach the DOM before measuring it.
    this.pendingRender = afterNextRender(() => {
      this.pendingRender = undefined;
      if (!this.show || this.destroyRef.destroyed) return;
      this.setDialogPosition();
      this.hidden = false;
      this.cdr.detectChanges();
      if (this.focusPending) {
        this.focusPending = false;
        this.searchInput?.nativeElement.focus({ preventScroll: true });
      }
    }, { injector: this.injector });
    this.cdr.markForCheck();
  }

  private removeListeners(): void {
    this.document.removeEventListener('mousedown', this.listenerMouseDown);
    this.document.removeEventListener('focusin', this.listenerFocus);
    this.window?.removeEventListener('resize', this.listenerResize);
    this.window?.removeEventListener('scroll', this.listenerResize, true);
  }

  private pixels<T extends number | null>(value: string, fallback: T): number | T {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
  }
}
