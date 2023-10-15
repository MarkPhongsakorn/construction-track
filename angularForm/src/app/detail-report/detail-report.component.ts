import { Component, OnInit, Inject } from '@angular/core';
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

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css'],
  providers: [DialogService]
})
export class DetailReportComponent implements OnInit {

  problem: string = '';
  dr_id: string = '';

  period_name1: string = '';
  period_name2: string = '';
  sta_name1: string = '';
  sta_name2: string = '';
  sta_time1: string = '';
  sta_time2: string = '';

  morning: string = '1';
  afternoon: string = '2';

  laborID: string = '';
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
        this.laborID = data['labor_id']
      this.labors = data;
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
      data: { dr_id: this.config.data.dr_id, project_id: this.config.data.project_id, labor_id: this.laborID }, header: ''
    });
  }

  closeDialog() {
    this.dialogRef.close(); // เรียกเมื่อต้องการปิด dialog
  }

}
