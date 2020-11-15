import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardItemComponent } from './admin-dashboard-item.component';

describe('AdminDashboardItemComponent', () => {
  let component: AdminDashboardItemComponent;
  let fixture: ComponentFixture<AdminDashboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
