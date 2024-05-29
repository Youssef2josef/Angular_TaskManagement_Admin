import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyGearAdminComponent } from './body-gear-admin.component';

describe('BodyGearAdminComponent', () => {
  let component: BodyGearAdminComponent;
  let fixture: ComponentFixture<BodyGearAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyGearAdminComponent]
    });
    fixture = TestBed.createComponent(BodyGearAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
