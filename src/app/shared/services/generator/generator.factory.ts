import { InjectionToken } from '@angular/core';

import { GeneratorService } from './generator.service';

export const GeneratedId = new InjectionToken<string>('id');

export function generatorFactory(n: number): (service: GeneratorService) => string {
  return service => service.generate(n);
}
