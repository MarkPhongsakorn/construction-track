import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestUserComponent } from './add-request-user.component';

describe('AddRequestUserComponent', () => {
  let component: AddRequestUserComponent;
  let fixture: ComponentFixture<AddRequestUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRequestUserComponent]
    });
    fixture = TestBed.createComponent(AddRequestUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
