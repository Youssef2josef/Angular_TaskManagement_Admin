import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEmployeComponent } from './auth-employe.component';

describe('AuthEmployeComponent', () => {
  let component: AuthEmployeComponent;
  let fixture: ComponentFixture<AuthEmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthEmployeComponent]
    });
    fixture = TestBed.createComponent(AuthEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
