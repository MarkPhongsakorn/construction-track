import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatNameComponent } from './add-mat-name.component';

describe('AddMatNameComponent', () => {
  let component: AddMatNameComponent;
  let fixture: ComponentFixture<AddMatNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMatNameComponent]
    });
    fixture = TestBed.createComponent(AddMatNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
