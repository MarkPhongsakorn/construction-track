import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/reports/weather.service';
import { LaborService } from '../services/reports/labor.service';
import { WorkService } from '../services/reports/work.service';
import { ToolService } from '../services/reports/tool.service';
import { MaterialService } from '../services/reports/material.service';
import { ProblemService } from '../services/reports/problem.service';
import { StrikeService } from '../services/reports/strike.service';
import { InspectionService } from '../services/reports/inspection.service';
import { OverdueService } from '../services/reports/overdue.service';
import { EditDetailComponent } from '../edit-detail/edit-detail.component';
import { DynamicDialogRef, DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ExcelExportService } from '../services/reports/excel-export.service';
import { ReportService } from '../services/reports/report.service';
import { ProjectService } from '../services/projects/project.service';
import { TimeInspectService } from '../services/reports/time-inspect.service';
import { WorkingTimeService } from '../services/reports/working-time.service';
import { format, parse } from 'date-fns';

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
  rain_start1: string = '';
  rain_start2: string = '';
  rain_end1: string = '';
  rain_end2: string = '';
  rain_level1: string = '';
  rain_level2: string = '';

  inspect_start: string = '';
  inspect_end: string = '';
  work_start: string = '';
  work_end: string = '';

  morning: string = '1';
  afternoon: string = '2';

  labors: any[] = [];

  works: any[] = [];

  tools: any[] = [];

  mats: any[] = [];

  strike_detail: string = '';
  strike_cause: string = '';

  inspec_result: string = '';

  od_detail: string = '';

  readWeather1: boolean = false;
  readWeather2: boolean = false;
  readLabor: boolean = false;
  readWork: boolean = false;
  readTool: boolean = false;
  readMaterial: boolean = false;
  readStrike: boolean = false;
  readInspec: boolean = false;
  readReport: boolean = false;
  readOd: boolean = false;
  readInspTime: boolean = false;
  readWorkTime: boolean = false;

  ref: DynamicDialogRef | undefined;

  dr_id: string = '';
  dr_time: Date = new Date;
  project_name: string = '';
  comp_name: string = '';

  labor_name: string[] = [];
  labor_num: number[] = [];

  work_num: number[] = [];
  work_detail: string[] = [];

  tool_name: string[] = [];
  tool_num: number[] = [];

  mat_name: string[] = [];
  mat_num: number[] = [];
  mat_unit: string[] = [];


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
    private overdueService: OverdueService,
    private excelExportService: ExcelExportService,
    private reportService: ReportService,
    private projectService: ProjectService,
    private timeInspectService: TimeInspectService,
    private workingTimeService: WorkingTimeService
  ) {
  }

  ngOnInit() {
    this.weather();
    this.timeInspec();
    this.workTime();
    this.labor();
    this.work();
    this.tool();
    this.mat();
    this.prob();
    this.strike();
    this.inspec();
    this.overdue();
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
        this.rain_start1 = data['rain_start'];
        this.rain_end1 = data['rain_end'];
        this.rain_level1 = data['rain_name'];
        return this.readWeather1
      }
    });
    this.weatherService.readOne(this.config.data.dr_id, this.afternoon).subscribe(data => {

      if (data.status === "error") {
        return this.readWeather2 = true
      } else {
        this.period_name2 = data['period_name'];
        this.sta_name2 = data['sta_name'];
        this.rain_start2 = data['rain_start'];
        this.rain_end2 = data['rain_end'];
        this.rain_level2 = data['rain_name'];
        return this.readWeather2
      }
    });
  }
  timeInspec() {
    this.timeInspectService.readOne(this.config.data.dr_id).subscribe(data => {
      if (data.status === 'error') {
        return this.readInspTime = true
      } else {
        this.inspect_start = data['inspect_start'];
        this.inspect_end = data['inspect_end'];
        return this.readInspTime
      }

    });
  }

  workTime() {
    this.workingTimeService.readOne(this.config.data.dr_id).subscribe(data => {
      if (data.status === 'error') {
        return this.readWorkTime = true;
      } else {
        this.work_start = data['work_start'];
        this.work_end = data['work_end'];
        return this.readWorkTime
      }

    })
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
        this.tools.forEach(tool => {
          this.tool_name.push(tool.tool_name);
          this.tool_num.push(tool.tool_num);
        })
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
        this.mats.forEach(mat => {
          this.mat_name.push(mat.mat_name);
          this.mat_num.push(mat.mat_num);
          this.mat_unit.push(mat.mat_unit);
        })
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

  overdue() {
    this.overdueService.readOne(this.config.data.dr_id).subscribe(data => {
      if (data.status === "error") {
        return this.readOd = true;
      } else {
        this.od_detail = data['od_detail'];
        return this.readOd
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

  getFormattedDate(date: Date): string {
    const days = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];

    const drTime = new Date(this.dr_time)
    const formattedDate = format(drTime, 'dd/MM/yyyy');
    const thaiDate = `${days[date.getDay()]}ที่ ${formattedDate} พ.ศ. ${date.getFullYear() + 543}`;

    return thaiDate;
  }

  exportToExcel(): void {

    const days = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    const month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

    const drTime = new Date(this.dr_time)
    const formattedDate = format(drTime, 'dd');
    const thaiDate = `${days[drTime.getDay()]}ที่ ${formattedDate} เดือน ${month[drTime.getMonth()]} พ.ศ. ${drTime.getFullYear() + 543}`;

    const nameSheet = format(drTime, 'dd-MM-yyyy');

    const fileName = 'รายงานประจำวันที่_' + nameSheet;
    const sheetName = nameSheet;

    let start1: Date = parse(this.rain_start1, 'HH:mm:ss', new Date(0, 0, 0));
    let start2: Date = parse(this.rain_start2, 'HH:mm:ss', new Date(0, 0, 0));
    let end1: Date = parse(this.rain_end1, 'HH:mm:ss', new Date(0, 0, 0));
    let end2: Date = parse(this.rain_end2, 'HH:mm:ss', new Date(0, 0, 0));
    let formatRainStart1 = format(start1, 'HH:mm');
    let formatRainStart2 = format(start2, 'HH:mm');
    let formatRainEnd1 = format(end1, 'HH:mm');
    let formatRainEnd2 = format(end2, 'HH:mm');
    let rainStart1 = '';
    let rainStart2 = '';
    let rainEnd1 = '';
    let rainEnd2 = '';

    if (this.rain_start1 == '00:00:00' && this.rain_end1 == '00:00:00') {
      rainStart1 = '-';
      rainEnd1 = '-';
    } else {
      rainStart1 = formatRainStart1;
      rainEnd1 = formatRainEnd1;
    }

    if (this.rain_start2 == '00:00:00' && this.rain_end2 == '00:00:00') {
      rainStart2 = '-';
      rainEnd2 = '-';
    } else {
      rainStart2 = formatRainStart2;
      rainEnd2 = formatRainEnd2;
    }

    this.excelExportService.exportToExcel(
      this.project_name,
      thaiDate,
      this.comp_name,
      this.period_name1,
      this.sta_name1,
      rainStart1,
      rainEnd1,
      this.period_name2,
      this.sta_name2,
      rainStart2,
      rainEnd2,
      this.labor_name,
      this.labor_num,
      this.work_num,
      this.work_detail,
      this.tool_name,
      this.tool_num,
      this.mat_name,
      this.mat_num,
      this.mat_unit,
      this.problem,
      this.strike_detail,
      this.strike_cause,
      this.inspec_result,
      this.od_detail,
      fileName,
      sheetName
    );
  }

}
