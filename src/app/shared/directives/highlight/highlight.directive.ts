import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighlightDirective {
  private readonly defaultHighLightColor = '#D8D8D8';

  @Input('appHighLight') hightLightColor: string;

  constructor(public element: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.setBackgroundColor(this.hightLightColor || this.defaultHighLightColor);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.setBackgroundColor();
  }

  @HostBinding('style.cursor') get getCursor(): string {
    return 'pointer';
  }

  private setBackgroundColor(color: string = null): void{
    this.element.nativeElement.style.backgroundColor = color;
  }
}
