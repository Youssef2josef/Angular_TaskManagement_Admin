import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearAdminComponent } from './gear-admin.component';

describe('GearAdminComponent', () => {
  let component: GearAdminComponent;
  let fixture: ComponentFixture<GearAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GearAdminComponent]
    });
    fixture = TestBed.createComponent(GearAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
