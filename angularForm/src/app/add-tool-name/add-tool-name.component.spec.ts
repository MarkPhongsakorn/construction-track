import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToolNameComponent } from './add-tool-name.component';

describe('AddToolNameComponent', () => {
  let component: AddToolNameComponent;
  let fixture: ComponentFixture<AddToolNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToolNameComponent]
    });
    fixture = TestBed.createComponent(AddToolNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
