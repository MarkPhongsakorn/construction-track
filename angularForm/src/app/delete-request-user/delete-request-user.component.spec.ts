import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRequestUserComponent } from './delete-request-user.component';

describe('DeleteRequestUserComponent', () => {
  let component: DeleteRequestUserComponent;
  let fixture: ComponentFixture<DeleteRequestUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteRequestUserComponent]
    });
    fixture = TestBed.createComponent(DeleteRequestUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
