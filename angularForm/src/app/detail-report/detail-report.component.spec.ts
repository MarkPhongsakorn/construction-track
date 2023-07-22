import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReportComponent } from './detail-report.component';

describe('DetailReportComponent', () => {
  let component: DetailReportComponent;
  let fixture: ComponentFixture<DetailReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailReportComponent]
    });
    fixture = TestBed.createComponent(DetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
