import { ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const directive = new HighlightDirective(new ElementRef('div'));
    expect(directive).toBeTruthy();
  });
});
