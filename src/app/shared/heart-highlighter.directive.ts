import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHeartHighlighter]',
})
export class HeartHighlighterDirective {
  @Input()
  isFavorite: boolean;

  constructor(private elementReference: ElementRef) {}

  @HostListener('mouseenter')
  addHighlight() {
    if (!this.isFavorite) {
      this.elementReference.nativeElement.style.color = 'red';
    }
  }

  @HostListener('mouseleave')
  removeHighlight() {
    if (!this.isFavorite) {
      this.elementReference.nativeElement.style.color = 'gray';
    }

  }
}
