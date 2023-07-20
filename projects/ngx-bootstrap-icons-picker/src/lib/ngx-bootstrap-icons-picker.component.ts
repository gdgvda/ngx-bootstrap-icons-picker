import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxBootstrapIconsPickerService} from "./ngx-bootstrap-icons-picker.service";
import {BootstrapIcon} from "./ngx-bootstrap-icons-picker.model";

@Component({
  selector: 'lib-ngx-bootstrap-icons-picker',
  templateUrl: './ngx-bootstrap-icons-picker.component.html',
  styleUrls: ['./ngx-bootstrap-icons-picker.component.css']
})
export class NgxBootstrapIconsPickerComponent implements OnInit {

  @ViewChild('dialogPopup') dialogElement: any;

  // Popover
  public ipPosition: string = '';
  public ipHeight: number = 0;
  public ipMaxHeight: number = 0;
  public ipWidth: number = 0;
  // Icon css
  public ipIconSize: number = 0;
  public ipIconVerticalPadding: number = 0;
  public ipIconHorizontalPadding: number = 0;
  // Item Style ie input and button
  public ipButtonStyleClass: string = '';
  public ipInputSearchStyleClass: string = '';
  public ipDivSearchStyleClass: string = '';
  // Icon and behaviors
  public ipKeepSearchFilter: boolean = false;
  public ipPlaceHolder: string = '';
  public ipFallbackIcon: string = '';
  public ipIconPack: string[] = [];

  public show: boolean = false;
  public hidden: boolean = false;
  public top: number = 0;
  public left: number = 0;
  public position: string = '';
  public arrowTop: number = 0;
  public selectedIcon: BootstrapIcon|undefined;
  //public iconType = IconType;
  public buttonWidth: number = 0;
  public buttonHeight: number = 0;

  icons:BootstrapIcon[] = [];
  search:string = '';

  private directiveInstance: any;
  private initialIcon: string = '';
  private directiveElementRef: ElementRef|undefined;

  private listenerMouseDown: any;
  private listenerResize: any;

  private dialogArrowSize = 10;


  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private service: NgxBootstrapIconsPickerService
  ){}

  ngOnInit():void{
    console.log('init component');
    this.icons = this.service.getIcons(this.ipIconPack);
    this.listenerMouseDown = (event: any) => this.onMouseDown(event);
    this.listenerResize = () => this.onResize();
    this.openDialog(this.initialIcon);
  }


  setDialog(
    instance: any,
    elementRef: ElementRef,
    icon: string,
    ipPosition: string,
    ipHeight: string,
    ipMaxHeight: string,
    ipWidth: string,
    ipPlaceHolder: string,
    ipFallbackIcon: string,
    ipIconPack: string[],
    ipIconSize: string,
    ipIconVerticalPadding: string,
    ipIconHorizontalPadding: string,
    ipButtonStyleClass: string,
    ipDivSearchStyleClass: string,
    ipInputSearchStyleClass: string,
    ipKeepSearchFilter: string
  ):void{
    this.directiveInstance = instance;
    this.setInitialIcon(icon);
    this.directiveElementRef = elementRef;
    this.ipPosition = ipPosition;
    this.ipHeight = parseInt(ipHeight, 10);
    this.ipMaxHeight = parseInt(ipMaxHeight, 10);
    this.ipWidth = parseInt(ipWidth, 10);
    if (!this.ipWidth) { this.ipWidth = elementRef.nativeElement.offsetWidth; }
    this.ipIconSize = parseInt(ipIconSize, 10);
    this.ipIconVerticalPadding = parseInt(ipIconVerticalPadding, 10);
    this.ipIconHorizontalPadding = parseInt(ipIconHorizontalPadding, 10);
    this.ipKeepSearchFilter = JSON.parse(ipKeepSearchFilter);
    this.ipPlaceHolder = ipPlaceHolder;
    this.ipFallbackIcon = ipFallbackIcon;
    this.ipIconPack = ipIconPack;
    this.ipButtonStyleClass = ipButtonStyleClass;
    this.ipInputSearchStyleClass = ipInputSearchStyleClass;
    this.ipDivSearchStyleClass = ipDivSearchStyleClass;
    this.buttonHeight = this.ipIconSize + 2 * this.ipIconVerticalPadding;
    this.buttonWidth = this.ipIconSize + 2 * this.ipIconHorizontalPadding;
  }

  setInitialIcon(icon:string):void{
    this.initialIcon = icon;
    this.selectedIcon = this.icons.find(el=>el?el.name===icon:false);
    if(this.ipKeepSearchFilter && this.selectedIcon && icon!==this.ipFallbackIcon){
      this.search = this.selectedIcon.name;
    }else{
      this.search = '';
    }
  }

  openDialog(icon:string):void{
    this.setInitialIcon(icon);
    this.openIconPicker();
  }

  setSearch(val:string):void{
    this.search = val;
  }

  selectIcon(icon:BootstrapIcon):void{
    this.directiveInstance.iconSelected(icon.name);
    this.closeIconPicker();
  }

  onMouseDown(event:any):void{
    if(!this.isDescendant(this.el.nativeElement,event.target) && event.target!==this.directiveElementRef?.nativeElement){
      this.closeIconPicker();
    }
  }

  openIconPicker():void{
    if(!this.show){
      this.show = true;
      this.hidden = true;
      setTimeout(() => {
        this.setDialogPosition();
        this.hidden = false;
        this.cdr.detectChanges();
      },0);
      document.addEventListener('mousedown',this.listenerMouseDown);
      window.addEventListener('resize',this.listenerResize);
    }
  }

  closeIconPicker():void{
    if(this.show){
      this.show = false;
      document.removeEventListener('mousedown',this.listenerMouseDown);
      window.removeEventListener('resize',this.listenerResize);
      this.cdr.detectChanges();
    }
  }

  onResize():void{
    if(this.position==='fixed'){
      this.setDialogPosition();
    }
  }

  setDialogPosition():void{
    const dialogHeight = this.dialogElement.nativeElement.offsetHeight;
    let node = this.directiveElementRef?.nativeElement;
    let position = 'static';
    let transform = '';
    let parentNode:any = null;
    let transformNode:any = null;
    let style:any = null;
    while(node!==null && node.tagName!=='HTML'){
      style = window.getComputedStyle(node);
      position = style.getPropertyValue('position');
      transform = style.getPropertyValue('transform');
      if(position!=='static' && parentNode===null){
        parentNode = node;
      }
      if(transform && transform!=='none' && transformNode===null){
        transformNode = node;
      }
      if(position==='fixed'){
        parentNode = transformNode;
        break;
      }
      node = node.parentNode;
    }
    const boxDirective = this.createBox(this.directiveElementRef?.nativeElement,(position!=='fixed'));
    if(position!=='fixed' || parentNode){
      if(parentNode===null){
        parentNode = node;
      }
      const boxParent = this.createBox(parentNode,true);
      this.top = boxDirective.top - boxParent.top;
      this.left = boxDirective.left - boxParent.left;
    }else{
      this.top = boxDirective.top;
      this.left = boxDirective.left;
    }
    if(position==='fixed'){
      this.position = 'fixed';
    }
    if(this.ipPosition==='left'){
      this.left -= this.ipWidth + this.dialogArrowSize - 2;
    }else if(this.ipPosition==='top'){
      this.top -= dialogHeight + this.dialogArrowSize;
      this.arrowTop = dialogHeight - 1;
    }else if(this.ipPosition==='bottom'){
      this.top += boxDirective.height + this.dialogArrowSize;
    }else{
      this.left += boxDirective.width + this.dialogArrowSize - 2;
    }
  }

  isDescendant(parent:any,child:any):boolean{
    let node:any = child.parentNode;
    while(node!==null){
      if(node===parent){
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  createBox(element:any,offset:boolean):any{
    return{
      top: element.getBoundingClientRect().top + (offset ? window.pageYOffset : 0),
      left: element.getBoundingClientRect().left + (offset ? window.pageXOffset : 0),
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }

}
