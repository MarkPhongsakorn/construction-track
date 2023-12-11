import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMatNameComponent } from './delete-mat-name.component';

describe('DeleteMatNameComponent', () => {
  let component: DeleteMatNameComponent;
  let fixture: ComponentFixture<DeleteMatNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteMatNameComponent]
    });
    fixture = TestBed.createComponent(DeleteMatNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
