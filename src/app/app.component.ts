import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { AppConfig } from './shared/services/constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('appTitle') titleRef: ElementRef<HTMLHeadingElement>;

  constructor(@Inject(AppConfig) private appConfig: AppConfig) { }

  ngAfterViewInit(): void {
    this.titleRef.nativeElement.textContent = this.appConfig.title;
  }
}
