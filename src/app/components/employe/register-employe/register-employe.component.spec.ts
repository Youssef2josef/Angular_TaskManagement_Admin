import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmployeComponent } from './register-employe.component';

describe('RegisterEmployeComponent', () => {
  let component: RegisterEmployeComponent;
  let fixture: ComponentFixture<RegisterEmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterEmployeComponent]
    });
    fixture = TestBed.createComponent(RegisterEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
