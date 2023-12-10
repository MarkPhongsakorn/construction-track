import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLaborNameComponent } from './delete-labor-name.component';

describe('DeleteLaborNameComponent', () => {
  let component: DeleteLaborNameComponent;
  let fixture: ComponentFixture<DeleteLaborNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteLaborNameComponent]
    });
    fixture = TestBed.createComponent(DeleteLaborNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
