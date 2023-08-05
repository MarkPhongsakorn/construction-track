import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherService } from '../services/reports/weather.service';
import { LaborService } from '../services/reports/labor.service';
import { WorkService } from '../services/reports/work.service';
import { ToolService } from '../services/reports/tool.service';
import { MaterialService } from '../services/reports/material.service';
import { ProblemService } from '../services/reports/problem.service';
import { StrikeService } from '../services/reports/strike.service';
import { InspectionService } from '../services/reports/inspection.service';
import { EditDetailComponent } from '../edit-detail/edit-detail.component';

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css']
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

  labors: any[] = []; 

  works: any[] = [];

  tools: any[] = [];

  mats: any[] = [];

  strike_detail: string = ''; 
  strike_cause: string = ''; 

  inspec_result: string = '';
  
  readWeather: boolean = false;
  readLabor: boolean = false;
  readWork: boolean = false;
  readTool: boolean = false;
  readMaterial: boolean = false;
  readStrike: boolean = false;
  readInspec: boolean = false;
  readReport: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DetailReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
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
    this.weatherService.readOne(this.data.dr_id, this.morning).subscribe(data => {
      this.period_name1 = data['period_name'];
      this.sta_name1 = data['sta_name'];
      this.sta_time1 = data['sta_time'];
      if (data.status === "error") {
        return this.readWeather = true
      } else {
        return this.readWeather
      }
    });
    this.weatherService.readOne(this.data.dr_id, this.afternoon).subscribe(data => {
      this.period_name2 = data['period_name'];
      this.sta_name2 = data['sta_name'];
      this.sta_time2 = data['sta_time'];
      if (data.status === "error") {
        return this.readWeather = true
      } else {
        return this.readWeather
      }
    });
  }

  labor() {
    this.laborService.readOne(this.data.dr_id).subscribe(data => {
      this.labors = data;
      if (data.status === "error") {
        return this.readLabor = true
      } else {
        return this.readLabor
      }
    });
  }

  work() {
    this.workService.readOne(this.data.dr_id).subscribe(data => {
      this.works = data;
      if (data.status === "error") {
        return this.readWork = true
      } else {
        return this.readWork
      }
    });
  }

  tool() {
    this.toolService.readOne(this.data.dr_id).subscribe(data => {
      this.tools = data;
      if (data.status === "error") {
        return this.readTool = true
      } else {
        return this.readTool
      }
    });
  }

  mat() {
    this.matService.readOne(this.data.dr_id).subscribe(data => {
      this.mats = data;
      if (data.status === "error") {
        return this.readMaterial = true
      } else {
        return this.readMaterial
      }
    });
  }

  prob() {
    this.problemService.readOne(this.data.dr_id).subscribe(data => {
      this.problem = data['problem'];
    });
  }

  strike() {
    this.strikeService.readOne(this.data.dr_id).subscribe(data => {
        this.strike_detail = data['strike_detail'];
        this.strike_cause = data['strike_cause'];
        if (data.status === "error") {
          return this.readStrike = true
        } else {
          return this.readStrike
        }
    });
  }

  inspec() {
    this.inspecService.readOne(this.data.dr_id).subscribe(data => {
      this.inspec_result = data['inspec_result'];
      if (data.status === "error") {
        return this.readInspec = true
      } else {
        return this.readInspec
      }
    });
  }

  openEditDetail() {
    const dialogRef = this.dialog.open(EditDetailComponent, {
      data: {dr_id: this.data.dr_id, project_id: this.data.project_id}
    });
  }

}
