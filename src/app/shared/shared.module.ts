import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { MovieHighlighterDirective } from './movie-highlighter.directive';
import { HeartHighlighterDirective } from './heart-highlighter.directive';




@NgModule({
  declarations: [
    DropdownDirective,
    MovieHighlighterDirective,
    HeartHighlighterDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    MovieHighlighterDirective,
    HeartHighlighterDirective
  ]
})
export class SharedModule { }
