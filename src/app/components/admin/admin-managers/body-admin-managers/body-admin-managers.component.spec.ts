import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyAdminManagersComponent } from './body-admin-managers.component';

describe('BodyAdminManagersComponent', () => {
  let component: BodyAdminManagersComponent;
  let fixture: ComponentFixture<BodyAdminManagersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyAdminManagersComponent]
    });
    fixture = TestBed.createComponent(BodyAdminManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
