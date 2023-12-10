import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLaborNameComponent } from './edit-labor-name.component';

describe('EditLaborNameComponent', () => {
  let component: EditLaborNameComponent;
  let fixture: ComponentFixture<EditLaborNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLaborNameComponent]
    });
    fixture = TestBed.createComponent(EditLaborNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
