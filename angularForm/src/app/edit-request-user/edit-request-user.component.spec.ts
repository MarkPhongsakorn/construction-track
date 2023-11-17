import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestUserComponent } from './edit-request-user.component';

describe('EditRequestUserComponent', () => {
  let component: EditRequestUserComponent;
  let fixture: ComponentFixture<EditRequestUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRequestUserComponent]
    });
    fixture = TestBed.createComponent(EditRequestUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
