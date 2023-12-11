import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditToolNameComponent } from './edit-tool-name.component';

describe('EditToolNameComponent', () => {
  let component: EditToolNameComponent;
  let fixture: ComponentFixture<EditToolNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditToolNameComponent]
    });
    fixture = TestBed.createComponent(EditToolNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
