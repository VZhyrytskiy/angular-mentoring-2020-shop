import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFontAdjustment]'
})
export class FontAdjustmentDirective {
  
  @Input('appFontAdjustment') multiplier: number;

  private readonly fontSizeStyleName = 'font-size';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onClick(): void {
    this.renderer.setStyle(this.elRef.nativeElement, this.fontSizeStyleName, `${this.multiplier * 100}%`);
    setTimeout(() => this.renderer.removeStyle(this.elRef.nativeElement, this.fontSizeStyleName), 500);
  }
}
