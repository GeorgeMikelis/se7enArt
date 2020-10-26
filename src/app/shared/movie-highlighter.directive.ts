import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMovieHighlighter]',
})
export class MovieHighlighterDirective {
  constructor(private elementReference: ElementRef) {}

  @HostListener('mouseenter')
  addHighlight() {
    this.elementReference.nativeElement.style.color = 'blue';
  }

  @HostListener('mouseleave')
  removeHighlight() {
    this.elementReference.nativeElement.style.color = '#337ab7';
  }
}
