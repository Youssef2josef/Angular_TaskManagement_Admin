import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManagersAdminStatusComponent } from './edit-managers-admin-status.component';

describe('EditManagersAdminStatusComponent', () => {
  let component: EditManagersAdminStatusComponent;
  let fixture: ComponentFixture<EditManagersAdminStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditManagersAdminStatusComponent]
    });
    fixture = TestBed.createComponent(EditManagersAdminStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
