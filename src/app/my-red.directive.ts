import { Directive, ElementRef,Renderer, HostListener,HostBinding  } from '@angular/core';

@Directive({
  selector: '[MyRed]'
})
export class MyRedDirective {

  constructor(elRef: ElementRef) {  
    elRef.nativeElement.style.color = 'orange';  
 }  

}

@Directive({
  selector: '[appChbgcolor]'
})
export class ChangeBgColorDirective {
  constructor(private el: ElementRef, private renderer: Renderer) {
      // this.ChangeBgColor('red');
  }
  @HostListener('mouseover') onMouseOver() {
      this.ChangeBgColor('red');
      this.border = '5px solid green';
  }
  @HostListener('click') onClick() {
      window.alert('Host Element Clicked');
  }
  @HostListener('mouseleave') onMouseLeave() {
      this.ChangeBgColor('black');
      this.border = 'none';
  }
  ChangeBgColor(color: string) {
      this.renderer.setElementStyle(this.el.nativeElement, 'color', color);
  }


@HostBinding('style.border') border: string;
}