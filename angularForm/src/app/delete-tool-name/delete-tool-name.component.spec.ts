import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteToolNameComponent } from './delete-tool-name.component';

describe('DeleteToolNameComponent', () => {
  let component: DeleteToolNameComponent;
  let fixture: ComponentFixture<DeleteToolNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteToolNameComponent]
    });
    fixture = TestBed.createComponent(DeleteToolNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
