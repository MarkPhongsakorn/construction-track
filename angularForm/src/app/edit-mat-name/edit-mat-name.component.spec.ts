import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMatNameComponent } from './edit-mat-name.component';

describe('EditMatNameComponent', () => {
  let component: EditMatNameComponent;
  let fixture: ComponentFixture<EditMatNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMatNameComponent]
    });
    fixture = TestBed.createComponent(EditMatNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
