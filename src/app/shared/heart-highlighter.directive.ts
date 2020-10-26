import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHeartHighlighter]',
})
export class HeartHighlighterDirective {
  constructor(private elementReference: ElementRef) {}

  @HostListener('mouseenter')
  addHighlight() {
    this.elementReference.nativeElement.style.color = 'red';
  }

  @HostListener('mouseleave')
  removeHighlight() {
    this.elementReference.nativeElement.style.color = 'gray';
  }
}
