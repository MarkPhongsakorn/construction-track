import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLaborNameComponent } from './add-labor-name.component';

describe('AddLaborNameComponent', () => {
  let component: AddLaborNameComponent;
  let fixture: ComponentFixture<AddLaborNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLaborNameComponent]
    });
    fixture = TestBed.createComponent(AddLaborNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
