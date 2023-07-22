import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodService } from '../services/reports/period.service';
import { StaWeatherService } from '../services/reports/sta-weather.service';
import { WeatherService } from '../services/reports/weather.service';
import { LaborService } from '../services/reports/labor.service';
import { WorkService } from '../services/reports/work.service';
import { UnitService } from '../services/reports/unit.service';
import { ToolService } from '../services/reports/tool.service';
import { MaterialService } from '../services/reports/material.service';
import { StrikeService } from '../services/reports/strike.service';
import { InspectionService } from '../services/reports/inspection.service';
import { InspecResultService } from '../services/reports/inspec-result.service';
import { ReportService } from '../services/reports/report.service';

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css']
})
export class DetailReportComponent implements OnInit {

  problem: string = '';

  period_name1: string = '';
  period_name2: string = '';
  sta_name1: string = '';
  sta_name2: string = '';

  morning: string = '1';
  afternoon: string = '2';

  labors: any[] = []; 

  works: any[] = [];

  tools: any[] = [];

  mats: any[] = [];

  strike_detail: string = ''; 
  strike_cause: string = ''; 

  inspec_result: string = '';

  constructor(
    public dialogRef: MatDialogRef<DetailReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private periodService: PeriodService,
    private sta: StaWeatherService,
    private weatherService: WeatherService,
    private laborService: LaborService,
    private workService: WorkService,
    private unitService: UnitService,
    private toolService: ToolService,
    private matService: MaterialService,
    private strikeService: StrikeService,
    private inspecService: InspectionService,
    private reportService: ReportService,
  ) { 
  }

  ngOnInit() {
    this.weather();
    this.labor();
    this.work();
    this.tool();
    this.mat();
    this.strike();
    this.inspec();
    this.report();
  }

  report() {
    this.reportService.getOneReport(this.data.dr_id).subscribe(data => {
      this.problem = data['problem'];
    });
  }

  weather() {
    this.weatherService.readOne(this.data.dr_id, this.morning).subscribe(data => {
      this.period_name1 = data['period_name'];
      this.sta_name1 = data['sta_name'];
    });
    this.weatherService.readOne(this.data.dr_id, this.afternoon).subscribe(data => {
      this.period_name2 = data['period_name'];
      this.sta_name2 = data['sta_name'];
    });
  }

  labor() {
    this.laborService.readOne(this.data.dr_id).subscribe(data => {
      this.labors = data;
    });
  }

  work() {
    this.workService.readOne(this.data.dr_id).subscribe(data => {
      this.works = data;
    });
  }

  tool() {
    this.toolService.readOne(this.data.dr_id).subscribe(data => {
      this.tools = data;
    });
  }

  mat() {
    this.matService.readOne(this.data.dr_id).subscribe(data => {
      this.mats = data;
    });
  }

  strike() {
    this.strikeService.readOne(this.data.dr_id).subscribe(data => {
        this.strike_detail = data['strike_detail'];
        this.strike_cause = data['strike_cause'];
    });
  }

  inspec() {
    this.inspecService.readOne(this.data.dr_id).subscribe(data => {
      this.inspec_result = data['inspec_result'];
    });
  }

  update() {}

}
