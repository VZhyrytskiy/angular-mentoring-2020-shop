import { Component, OnInit } from '@angular/core';
import { Category } from './category.enum';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  constructor() { }

  name = 'Mi Notebook 15.6';
  description = '15.6-inch screen, 1920x1080 pixel display. Full-size keyboard. CPU: Intel Core i5-10210U or i7-10510U processor, Quad core up to 4.2GHz-4.9GHz.';
  price = 1500;
  category: Category = Category.Notebook;
  isAvailable = true;
  rates: number[] = [4, 5, 4.5];

  ngOnInit(): void {
  }

}
