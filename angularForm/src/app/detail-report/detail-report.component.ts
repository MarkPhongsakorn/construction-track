import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/reports/weather.service';
import { LaborService } from '../services/reports/labor.service';
import { WorkService } from '../services/reports/work.service';
import { ToolService } from '../services/reports/tool.service';
import { MaterialService } from '../services/reports/material.service';
import { ProblemService } from '../services/reports/problem.service';
import { StrikeService } from '../services/reports/strike.service';
import { InspectionService } from '../services/reports/inspection.service';
import { EditDetailComponent } from '../edit-detail/edit-detail.component';
import { DynamicDialogRef, DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ExcelExportService } from '../services/reports/excel-export.service';
import { ReportService } from '../services/reports/report.service';
import { ProjectService } from '../services/projects/project.service';
import { format } from 'date-fns-tz';

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css'],
  providers: [DialogService]
})
export class DetailReportComponent implements OnInit {

  problem: string = '';

  period_name1: string = '';
  period_name2: string = '';
  sta_name1: string = '';
  sta_name2: string = '';
  sta_time1: string = '';
  sta_time2: string = '';

  morning: string = '1';
  afternoon: string = '2';

  labors: any[] = [];

  works: any[] = [];

  tools: any[] = [];

  mats: any[] = [];

  strike_detail: string = '';
  strike_cause: string = '';

  inspec_result: string = '';

  readWeather1: boolean = false;
  readWeather2: boolean = false;
  readLabor: boolean = false;
  readWork: boolean = false;
  readTool: boolean = false;
  readMaterial: boolean = false;
  readStrike: boolean = false;
  readInspec: boolean = false;
  readReport: boolean = false;

  ref: DynamicDialogRef | undefined;

  dr_id: string = '';
  dr_time: Date = new Date;
  project_name: string = '';
  comp_name: string = '';

  labor_name: string[] = [];
  labor_num: number[] = [];

  work_num: number[] = [];
  work_detail: string[] = [];

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private weatherService: WeatherService,
    private laborService: LaborService,
    private workService: WorkService,
    private toolService: ToolService,
    private matService: MaterialService,
    private problemService: ProblemService,
    private strikeService: StrikeService,
    private inspecService: InspectionService,
    private excelExportService: ExcelExportService,
    private reportService: ReportService,
    private projectService: ProjectService,
  ) {
  }

  ngOnInit() {
    this.weather();
    this.labor();
    this.work();
    this.tool();
    this.mat();
    this.prob();
    this.strike();
    this.inspec();
    this.report();
    this.project();
  }

  weather() {
    this.weatherService.readOne(this.config.data.dr_id, this.morning).subscribe(data => {

      if (data.status === "error") {
        return this.readWeather1 = true
      } else {
        this.period_name1 = data['period_name'];
        this.sta_name1 = data['sta_name'];
        this.sta_time1 = data['sta_time'];
        return this.readWeather1
      }
    });
    this.weatherService.readOne(this.config.data.dr_id, this.afternoon).subscribe(data => {

      if (data.status === "error") {
        return this.readWeather2 = true
      } else {
        this.period_name2 = data['period_name'];
        this.sta_name2 = data['sta_name'];
        this.sta_time2 = data['sta_time'];
        return this.readWeather2
      }
    });
  }

  labor() {
    this.laborService.readOne(this.config.data.dr_id).subscribe(data => {

      if (data.status === "error") {
        return this.readLabor = true
      } else {
        this.labors = data;
        this.labors.forEach(labor => {
          this.labor_name.push(labor.labor_name);
          this.labor_num.push(labor.labor_num);
          // ทำสิ่งที่คุณต้องการกับ laborName และ laborNum ที่ได้
        });
        return this.readLabor
      }
    });
  }

  work() {
    this.workService.readOne(this.config.data.dr_id).subscribe(data => {

      if (data.status === "error") {
        return this.readWork = true
      } else {
        this.works = data;
        this.works.forEach(work => {
          this.work_num.push(work.work_num);
          this.work_detail.push(work.work_detail);
        })
        return this.readWork
      }
    });
  }

  tool() {
    this.toolService.readOne(this.config.data.dr_id).subscribe(data => {

      if (data.status === "error") {
        return this.readTool = true
      } else {
        this.tools = data;
        return this.readTool
      }
    });
  }

  mat() {
    this.matService.readOne(this.config.data.dr_id).subscribe(data => {

      if (data.status === "error") {
        return this.readMaterial = true
      } else {
        this.mats = data;
        return this.readMaterial
      }
    });
  }

  prob() {
    this.problemService.readOne(this.config.data.dr_id).subscribe(data => {

      if (data.status === "error") {
        return this.readReport = true
      } else {
        this.problem = data['problem'];
        return this.readReport
      }
    });
  }

  strike() {
    this.strikeService.readOne(this.config.data.dr_id).subscribe(data => {

      if (data.status === "error") {
        return this.readStrike = true
      } else {
        this.strike_detail = data['strike_detail'];
        this.strike_cause = data['strike_cause'];
        return this.readStrike
      }
    });
  }

  inspec() {
    this.inspecService.readOne(this.config.data.dr_id).subscribe(data => {

      if (data.status === "error") {
        return this.readInspec = true
      } else {
        this.inspec_result = data['inspec_result'];
        return this.readInspec
      }
    });
  }

  openEditDetail() {
    this.ref = this.dialogService.open(EditDetailComponent, {
      data: { dr_id: this.config.data.dr_id, project_id: this.config.data.project_id }, header: ''
    });
  }

  closeDialog() {
    this.dialogRef.close(); // เรียกเมื่อต้องการปิด dialog
  }

  report() {
    this.reportService.getOneReport(this.config.data.dr_id).subscribe(data => {
      this.project_name = data['project_name'];
      this.dr_time = data['dr_time']
    })
  }

  project() {
    this.projectService.readOne(this.config.data.project_id).subscribe(data => {
      this.comp_name = data['comp_name'];
    });
  }

  exportToExcel(): void {
    const drTime = new Date(this.dr_time)
    const formattedDate = format(drTime, 'dd/MM/yyyy');

    // console.log(this.labor_name);
    // console.log(this.labor_num);


    const fileName = 'test';
    const sheetName = 'Sheet1';

    this.excelExportService.exportToExcel(
      this.project_name,
      formattedDate,
      this.comp_name,
      this.period_name1,
      this.sta_name1,
      this.sta_time1,
      this.period_name2,
      this.sta_name2,
      this.sta_time2,
      this.labor_name,
      this.labor_num,
      this.work_num,
      this.work_detail,
      fileName,
      sheetName
    );
  }

}
