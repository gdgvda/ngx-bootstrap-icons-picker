import {Directive,ElementRef,EventEmitter,HostListener,Input,OnChanges,OnInit,Output,ViewContainerRef} from '@angular/core';
import {NgxBootstrapIconsPickerComponent} from './lib.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[iconPicker]'
})
export class NgxBootstrapIconsPickerIconPickerDirective implements OnInit,OnChanges{

  @Input() iconPicker = ''

  @Input() bipWidth = '270px';
  @Input() bipHeight = 'auto';
  @Input() bipMaxHeight = '180px';

  @Input() bipIconSize = '18px';
  @Input() bipIconVerticalPadding = '9px';
  @Input() bipIconHorizontalPadding = '9px';
  @Input() bipKeepSearchFilter = 'false';

  @Input() bipPosition = 'bottom';
  @Input() bipFallbackIcon = 'github';
  @Input() bipPlaceholder = 'Search icon..';

  @Input() bipButtonStyleClass = 'btn btn-default';
  @Input() bipDivSearchStyleClass = '';
  @Input() bipInputSearchStyleClass = 'form-control input-sm';

  @Output() iconPickerSelect = new EventEmitter<string>(true);

  private dialog:any;
  private created:boolean;
  private ignoreChanges:boolean = false;

  constructor(
    private vcRef:ViewContainerRef,
    private el:ElementRef
  ){
    this.created = false;
  }

  @HostListener('click')

  onClick():void{
    this.openDialog();
  }

  ngOnChanges(changes:any):void{
    if(changes.iconPicker){
      this.ignoreChanges = false;
    }
  }

  ngOnInit():void{
    this.iconPicker = this.iconPicker || this.bipFallbackIcon || 'fa fa-user-plus';
    this.iconPickerSelect.emit(this.iconPicker);
  }

  openDialog():void{
    if(!this.created){
      this.created = true;
      const vcRef = this.vcRef;
      const cmpRef = vcRef.createComponent(NgxBootstrapIconsPickerComponent);
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
      if(this.vcRef!==vcRef){
        cmpRef.changeDetectorRef.detectChanges();
      }
    }else if(this.dialog){
      this.dialog.openDialog(this.iconPicker);
    }
  }

  iconSelected(icon:string):void{
    this.iconPickerSelect.emit(icon);
  }

}
