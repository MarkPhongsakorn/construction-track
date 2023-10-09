import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddReportComponent } from '../add-report/add-report.component';
import { ReportService } from '../services/reports/report.service';
import { EditReportComponent } from '../edit-report/edit-report.component';
import { DeleteReportComponent } from '../delete-report/delete-report.component';
import { AddDetailComponent } from '../add-detail/add-detail.component';
import { DetailReportComponent } from '../detail-report/detail-report.component';
import { PeriodService } from '../services/reports/period.service';
import { StaWeatherService } from '../services/reports/sta-weather.service';
import { WeatherService } from '../services/reports/weather.service';
import { LaborService } from '../services/reports/labor.service';
import { WorkService } from '../services/reports/work.service';
import { UnitService } from '../services/reports/unit.service';
import { ToolService } from '../services/reports/tool.service';
import { MaterialService } from '../services/reports/material.service';
import { ProblemService } from '../services/reports/problem.service';
import { StrikeService } from '../services/reports/strike.service';
import { InspectionService } from '../services/reports/inspection.service';
import { InspecResultService } from '../services/reports/inspec-result.service';
import { PdfService } from '../services/reports/pdf.service';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css'],
  providers: [DialogService]
})
export class DailyReportComponent implements OnInit {

  reports: any[] = [];

  morning: string = '1';
  afternoon: string = '2';

  ref: DynamicDialogRef | undefined;

  reportData: boolean = false;

  projectID: boolean = false;
  project: string = '';
  dr_id: string = '';
  dr_id1: string = '';
  
  constructor(
    public dialogService: DialogService,
    private report: ReportService,
    private route: ActivatedRoute,
    private periodService: PeriodService,
    private sta: StaWeatherService,
    private weatherService: WeatherService,
    private laborService: LaborService,
    private workService: WorkService,
    private unitService: UnitService,
    private toolService: ToolService,
    private matService: MaterialService,
    private problemService: ProblemService,
    private strikeService: StrikeService,
    private inspecService: InspectionService,
    private resultService: InspecResultService,
    private pdfService: PdfService
  ) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.project = (+params['project_id']).toString(); 
      this.loadReportData();
      this.checkData();
    });
    
  }
  
  loadReportData() {
    this.report.getOneByproject(this.project).subscribe(res => {
      // this.date = res['project_name'];
      if (res.status === 'error') {
        this.projectID = true;
      } else {
        this.reports = res;
        this.dr_id = res['dr_id'];
        this.projectID = false;
      }
    });
  }

  generatePDF() {
    const content = this.reports;
    this.pdfService.generatePDF(JSON.stringify(content));  // Pass content as a JSON string
  }
  
  
  openDialog() {
    this.ref = this.dialogService.open(AddReportComponent, { header: ''});
  }

  openDialog2(dr_id: string) {
    this.dr_id = dr_id;
    this.ref = this.dialogService.open(EditReportComponent, {
      data: { dr_id: this.dr_id }, header: ''
    });
  }

  openDialog3(dr_id: string) {
    this.dr_id = dr_id;
    this.ref = this.dialogService.open(DeleteReportComponent, {
      data: { dr_id: this.dr_id }, header: ''
    });
  }

  openDialog4(dr_id: string) {
    this.dr_id = dr_id;
    this.ref = this.dialogService.open(AddDetailComponent, {
      data: { dr_id: this.dr_id, project_id: this.project }, header: ''
    });
  }

  openDialog5(dr_id: string) {
    this.dr_id = dr_id;
    this.ref = this.dialogService.open(DetailReportComponent, {
      data: { dr_id: this.dr_id, project_id: this.project }, header: ''
    });
  }

  checkData() {
    this.weatherService.readOne(this.dr_id, this.morning).subscribe((res: any) => {
      if (res.status === 'success') {
        this.weatherService.readOne(this.dr_id, this.afternoon).subscribe((data: any) => {
          if (data.status === 'success') {
            this.laborService.readOne(this.dr_id).subscribe((res: any) => {
              if (res.status === 'success') {
                this.workService.readOne(this.dr_id).subscribe((res: any) => {
                  if (res.status === 'success') {
                    this.toolService.readOne(this.dr_id).subscribe((res: any) => {
                      if (res.status === 'success') {
                        this.matService.readOne(this.dr_id).subscribe((res: any) => {
                          if (res.status === 'success') {
                            this.problemService.readOne(this.dr_id).subscribe((res: any) => {
                              if (res.status === 'success') {
                                this.strikeService.readOne(this.dr_id).subscribe((res: any) => {
                                  if (res.status === 'success') {
                                    this.inspecService.readOne(this.dr_id).subscribe((res: any) => {
                                      if (res.status === 'success') {
                                        return this.reportData = true;
                                      } else {
                                        return this.reportData = false;
                                      }
                                    });
                                    return true
                                  } else {
                                    return false
                                  }
                                })
                                return true
                              } else {
                                return false
                              }
                            })
                            return true
                          } else {
                            return false
                          }
                        });
                        return true
                      } else {
                        return false
                      }
                    })
                    return true
                  } else {
                    return false
                  }
                })
                return true
              } else {
                return false
              }
            })
            return true
          } else {
            return false
          }
        })
        return true
      } else {
        return false
      }
    })
  }

}
