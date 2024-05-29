import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagersComponent } from './admin-managers.component';

describe('AdminManagersComponent', () => {
  let component: AdminManagersComponent;
  let fixture: ComponentFixture<AdminManagersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManagersComponent]
    });
    fixture = TestBed.createComponent(AdminManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
