import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyDashboardAdminComponent } from './body-dashboard-admin.component';

describe('BodyDashboardAdminComponent', () => {
  let component: BodyDashboardAdminComponent;
  let fixture: ComponentFixture<BodyDashboardAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyDashboardAdminComponent]
    });
    fixture = TestBed.createComponent(BodyDashboardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
