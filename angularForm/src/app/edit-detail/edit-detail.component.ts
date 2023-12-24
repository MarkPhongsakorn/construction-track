import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
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
import { OverdueService } from '../services/reports/overdue.service';
import { RainLevelService } from '../services/reports/rain-level.service';
import { LaborNameService } from '../services/reports/labor-name.service';
import { ToolNameService } from '../services/reports/tool-name.service';
import { MatNameService } from '../services/reports/mat-name.service';
import { TimeInspectService } from '../services/reports/time-inspect.service';
import { WorkingTimeService } from '../services/reports/working-time.service';
import { forkJoin, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';


@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit {

  weather_id1: string = '';
  weather_id2: string = '';

  period: any[] = [];
  selectPeriod1: string = '';
  selectPeriod2: string = '';

  status: any[] = [];
  selectStatus1: string = '';
  selectStatus2: string = '';

  unit: any[] = [];
  selectUnit: string = '';

  inspec_id: string = '';
  result: any[] = [];
  selectResult: string = '';

  rain_level: any[] = [];
  selectedRainLevel1: string = '';
  selectedRainLevel2: string = '';

  morning: string = '1';
  rain_start1: string = '00:00';
  rain_end1: string = '00:00';
  afternoon: string = '2';
  rain_start2: string = '00:00';
  rain_end2: string = '00:00';

  time_inspect_id: string = '';
  inspect_start: string = '';
  inspect_end: string = '';

  work_time_id: string = '';
  work_start: string = '';
  work_end: string = '';

  labor_name: any[] = [];
  selectLaborName: string = '';

  tool_name: any[] = [];
  selectToolName: string = '';

  mat_name: any[] = [];
  selectMatName: string = '';

  laborCr: any[] = [];
  laborUp: any[] = [];
  labor_id: string = '';
  laborId: string = '';

  workCr: any[] = [];
  workUp: any[] = [];
  work_id: string = '';
  num: number = 0;

  toolCr: any[] = [];
  toolUp: any[] = [];
  tool_id: string = '';

  matCr: any[] = [];
  matUp: any[] = [];
  mat_id: string = '';

  prob_id: string = '';
  problem: string = '';

  strike_id: string = '';
  strike_detail: string = '';
  strike_cause: string = '';

  od_id: string = '';
  od_detail: string = '';

  mornings: boolean = false;
  afternoons: boolean = false;
  labors: boolean = false;
  laborsC: boolean = false;
  works: boolean = false;
  worksC: boolean = false;
  tools: boolean = false;
  toolsC: boolean = false;
  materials: boolean = false;
  materialsC: boolean = false;
  problems: boolean = false;
  strikes: boolean = false;
  inspection: boolean = false;
  overdue: boolean = false;

  rainStart1: string = '';
  rainEnd1: string = '';
  rainStart2: string = '';
  rainEnd2: string = '';
  inspectStart: string = '';
  inspectEnd: string = '';
  workStart: string = '';
  workEnd: string = '';

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
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
    private overdueService: OverdueService,
    private rainLevelService: RainLevelService,
    private laborNameService: LaborNameService,
    private toolNameService: ToolNameService,
    private matNameService: MatNameService,
    private timeInspectService: TimeInspectService,
    private workingTimeService: WorkingTimeService
  ) {

  }

  ngOnInit() {
    this.periodService.readOne(this.morning).subscribe(data => {
      this.selectPeriod1 = data['period_id'];
    });
    this.periodService.readOne(this.afternoon).subscribe(data => {
      this.selectPeriod2 = data['period_id'];

    });
    this.weatherService.readOne(this.config.data.dr_id, this.morning).subscribe(data => {
      this.weather_id1 = data['weather_id'];
      this.selectStatus1 = data['sta_id'];
      this.selectedRainLevel1 = data['rain_id'];
      this.rain_start1 = data['rain_start'];
      this.rainStart1 = data['rain_start'];
      this.rainEnd1 = data['rain_end'];
      this.rain_end1 = data['rain_end'];
    });
    this.weatherService.readOne(this.config.data.dr_id, this.afternoon).subscribe(data => {
      this.weather_id2 = data['weather_id'];
      this.selectStatus2 = data['sta_id'];
      this.selectedRainLevel2 = data['rain_id'];
      this.rain_start2 = data['rain_start'];
      this.rain_end2 = data['rain_end'];
      this.rainStart2 = data['rain_start'];
      this.rainEnd2 = data['rain_end'];
    });
    this.timeInspectService.readOne(this.config.data.dr_id).subscribe(data => {
      this.time_inspect_id = data['time_inspect_id'];
      this.inspect_start = data['inspect_start'];
      this.inspect_end = data['inspect_end'];
      this.inspectStart = data['inspect_start'];
      this.inspectEnd = data['inspect_end'];
    });
    this.workingTimeService.readOne(this.config.data.dr_id).subscribe(data => {
      this.work_time_id = data['work_time_id'];
      this.work_start = data['work_start'];
      this.work_end = data['work_end'];
      this.workStart = data['work_start'];
      this.workEnd = data['work_end'];
    })
    this.laborService.readOne(this.config.data.dr_id).subscribe(data => {
      this.labor_id = data['labor_id'];
      if (data.status === 'error') {
        this.laborUp = [];
      } else {
        this.laborUp = data;
      }
    });
    this.workService.readOne(this.config.data.dr_id).subscribe(data => {
      this.work_id = data['work_id'];
      if (data.status === 'error') {
        this.workUp = [];
      } else {
        this.workUp = data;
      }
    });
    this.toolService.readOne(this.config.data.dr_id).subscribe(data => {
      this.tool_id = data['tool_id'];
      if (data.status === 'error') {
        this.toolUp = [];
      } else {
        this.toolUp = data;
      }
    });
    this.matService.readOne(this.config.data.dr_id).subscribe(data => {
      this.mat_id = data['mat_id'];
      if (data.status === 'error') {
        this.matUp = [];
      } else {
        this.matUp = data;
      }
    });
    this.problemService.readOne(this.config.data.dr_id).subscribe(data => {
      this.prob_id = data['prob_id'];
      this.problem = data['problem'];
    });
    this.strikeService.readOne(this.config.data.dr_id).subscribe(data => {
      this.strike_id = data['strike_id'];
      this.strike_cause = data['strike_cause'];
      this.strike_detail = data['strike_detail'];

    });
    this.inspecService.readOne(this.config.data.dr_id).subscribe(data => {
      this.inspec_id = data['inspec_id'];
      this.selectResult = data['inspec_result_id'];
    });
    this.overdueService.readOne(this.config.data.dr_id).subscribe(data => {
      this.od_id = data['od_id'];
      this.od_detail = data['od_detail'];

    });
    this.periodService.read().subscribe(data => {
      this.period = data;
    });
    this.sta.read().subscribe(data => {
      this.status = data;
    });
    this.resultService.read().subscribe(data => {
      this.result = data;
    });
    this.laborNameService.read().subscribe(data => {
      this.labor_name = data;
    });
    this.toolNameService.read().subscribe(data => {
      this.tool_name = data;
    });
    this.matNameService.read().subscribe(data => {
      this.mat_name = data;
      this.mat_name = this.mat_name.map((mat_name_id: any) => {
        return {
          ...mat_name_id,
          displayLabel: mat_name_id.mat_name + '(' + mat_name_id.mat_unit + ')'
        };
      });
    });
    this.rainLevelService.read().subscribe(data => {
      this.rain_level = data;
    })

  }

  UpdateDetail() {
    let rainTimeStart1: Date;
    if (this.rain_start1 === this.rainStart1) {
      rainTimeStart1 = new Date(`1970-01-01T${this.rain_start1}`);
    } else {
      rainTimeStart1 = new Date(this.rain_start1);
    }

    let rainTimeEnd1: Date;
    if (this.rain_end1 === this.rainEnd1) {
      rainTimeEnd1 = new Date(`1970-01-01T${this.rain_end1}`);
    } else {
      rainTimeEnd1 = new Date(this.rain_end1);
    }

    let rainTimeStart2: Date;
    if (this.rain_start2 === this.rainStart2) {
      rainTimeStart2 = new Date(`1970-01-01T${this.rain_start2}`);
    } else {
      rainTimeStart2 = new Date(this.rain_start2);
    }

    let rainTimeEnd2: Date;
    if (this.rain_end2 === this.rainEnd2) {
      rainTimeEnd2 = new Date(`1970-01-01T${this.rain_end2}`);
    } else {
      rainTimeEnd2 = new Date(this.rain_end2);
    }

    let inspectTimeStart: Date;
    if (this.inspect_start === this.inspectStart) {
      inspectTimeStart = new Date(`1970-01-01T${this.inspect_start}`);
    } else {
      inspectTimeStart = new Date(this.inspect_start);
    }

    let inspectTimeEnd: Date;
    if (this.inspect_end === this.inspectEnd) {
      inspectTimeEnd = new Date(`1970-01-01T${this.inspect_end}`);
    } else {
      inspectTimeEnd = new Date(this.inspect_end);
    }

    let workTimeStart: Date;
    if (this.work_start === this.workStart) {
      workTimeStart = new Date(`1970-01-01T${this.work_start}`);
    } else {
      workTimeStart = new Date(this.work_start);
    }

    let workTimeEnd: Date;
    if (this.work_end === this.workEnd) {
      workTimeEnd = new Date(`1970-01-01T${this.work_end}`);
    } else {
      workTimeEnd = new Date(this.work_end);
    }

    const formattedrainStart1 = format(rainTimeStart1, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedrainEnd1 = format(rainTimeEnd1, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedrainStart2 = format(rainTimeStart2, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedrainEnd2 = format(rainTimeEnd2, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedInspectStart = format(inspectTimeStart, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedInspectEnd = format(inspectTimeEnd, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedworkStart = format(workTimeStart, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedworkEnd = format(workTimeEnd, "yyyy-MM-dd HH:mm:ss", { locale: th });

    const data1 = {
      weather_id: this.weather_id1,
      period_id: this.selectPeriod1,
      sta_id: this.selectStatus1,
      rain_id: this.selectedRainLevel1,
      rain_start: formattedrainStart1,
      rain_end: formattedrainEnd1,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id,
    }
    const data2 = {
      weather_id: this.weather_id2,
      period_id: this.selectPeriod2,
      sta_id: this.selectStatus2,
      rain_id: this.selectedRainLevel2,
      rain_start: formattedrainStart2,
      rain_end: formattedrainEnd2,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id,
    }
    const time_inspect = {
      time_inspect_id: this.time_inspect_id,
      inspect_start: formattedInspectStart,
      inspect_end: formattedInspectEnd,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id,
    }
    const work_time = {
      work_time_id: this.work_time_id,
      work_start: formattedworkStart,
      work_end: formattedworkEnd,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id,
    }
    const data3 = {
      prob_id: this.prob_id,
      problem: this.problem,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    }
    const data4 = {
      strike_id: this.strike_id,
      strike_detail: this.strike_detail,
      strike_cause: this.strike_cause,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    }
    const data5 = {
      inspec_id: this.inspec_id,
      inspec_result_id: this.selectResult,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    }
    const data6 = {
      od_id: this.od_id,
      od_detail: this.od_detail,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    }

    const updateRequests: Observable<any>[] = [
      this.weatherService.update(data1),
      this.weatherService.update(data2),
      this.timeInspectService.update(time_inspect),
      this.workingTimeService.update(work_time),
      this.laborService.create(this.laborCr),
      this.laborService.update(this.laborUp),
      this.workService.create(this.workCr),
      this.workService.update(this.workUp),
      this.toolService.create(this.toolCr),
      this.toolService.update(this.toolUp),
      this.matService.create(this.matCr),
      this.matService.update(this.matUp),
      this.problemService.update(data3),
      this.strikeService.update(data4),
      this.inspecService.update(data5),
      this.overdueService.update(data6)
    ];

    forkJoin(updateRequests).subscribe(
      (responses: any[]) => {
        for (const res of responses) {
          if (res.status === 'success') {
            Swal.fire({
              title: 'สำเร็จ',
              text: 'การแก้ไขรายงานประจำวันสำเร็จ',
              icon: 'success',
              confirmButtonText: 'ตกลง'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              title: 'ข้อผิดพลาด',
              text: 'เกิดข้อผิดพลาดในการแก้ไขรายงานประจำวันสำเร็จ',
              icon: 'error',
              confirmButtonText: 'ตกลง'
            });
          }
        }
      }
    )
  }

  // ************************************LABOR***********************************
  addNewLabor(): void {
    const newLabor = {
      labor_name_id: this.selectLaborName,
      labor_num: 0,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    };
    this.laborCr.push(newLabor); // เพิ่ม object ใหม่เข้าไปในตัวแปร labor
  }
  removeLabor(index: number): void {
    this.laborCr.splice(index, 1); // ลบ object ที่ index ที่กำหนดออกจากตัวแปร labor
  }
  dataLabor() {
    const data = {
      labor_id: this.labor_id,
      labor_name_id: this.selectLaborName,
      labor_num: null,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    };
    this.laborUp.push(data);
  }

  // ************************************WORK***********************************
  addNewWork() {
    const newWork = {
      work_num: this.num,
      work_detail: '',
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    };
    this.workCr.push(newWork);
  }
  removeWork(index: number): void {
    this.workCr.splice(index, 1); // ลบ object ที่ index ที่กำหนดออกจากตัวแปร labor
  }
  dataWork() {
    const data = {
      work_id: this.work_id,
      work_num: this.num,
      work_detail: '',
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    };
    this.workUp.push(data);
  }

  // *******************************************TOOL*********************************************
  addNewTool() {
    const newTool = {
      tool_name_id: this.selectToolName,
      tool_num: 0,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    };
    this.toolCr.push(newTool);
    this.selectUnit = '';
  }
  removeTool(index: number): void {
    this.toolCr.splice(index, 1);
  }
  dataTool() {
    const data = {
      tool_id: this.tool_id,
      tool_name_id: this.selectToolName,
      tool_num: null,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    };
    this.toolUp.push(data);
  }

  // *******************************************MATERIAL*********************************************
  addNewMat() {
    const newMat = {
      mat_name_id: this.selectMatName,
      mat_num: 0,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    };
    this.matCr.push(newMat);
    this.selectUnit = '';
  }
  removeMat(index: number): void {
    this.matCr.splice(index, 1);
  }

  dataMat() {
    const data = {
      mat_id: this.mat_id,
      mat_name_id: this.selectMatName,
      mat_num: null,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    };
    this.matUp.push(data);
  }

  closeDialog() {
    this.dialogRef.close(); // เรียกเมื่อต้องการปิด dialog
  }


}
