import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeAdminStatusComponent } from './edit-employee-admin-status.component';

describe('EditEmployeeAdminStatusComponent', () => {
  let component: EditEmployeeAdminStatusComponent;
  let fixture: ComponentFixture<EditEmployeeAdminStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmployeeAdminStatusComponent]
    });
    fixture = TestBed.createComponent(EditEmployeeAdminStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
