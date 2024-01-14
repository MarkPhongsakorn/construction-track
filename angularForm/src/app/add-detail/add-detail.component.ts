import { Component, OnInit } from '@angular/core';
import { PeriodService } from '../services/reports/period.service';
import { StaWeatherService } from '../services/reports/sta-weather.service';
import { WeatherService } from '../services/reports/weather.service';
import { LaborService } from '../services/reports/labor.service';
import { WorkService } from '../services/reports/work.service';
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
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { forkJoin, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { format } from 'date-fns-tz';
import { th } from 'date-fns/locale';


@Component({
  selector: 'app-add-detail',
  templateUrl: './add-detail.component.html',
  styleUrls: ['./add-detail.component.css']
})
export class AddDetailComponent implements OnInit {

  period: any[] = [];
  selectPeriod1: string = '';
  selectPeriod2: string = '';

  status: any[] = [];
  selectStatus1: string = '';
  selectStatus2: string = '';

  labor_name: any[] = [];
  selectLaborName: string = '';

  tool_name: any[] = [];
  selectToolName: string = '';

  mat_name: any[] = [];
  selectMatName: string = '';

  unit: any[] = [];
  selectUnit: string = '';

  result: any[] = [];
  selectResult: string = '';

  rain_level: any[] = [];
  selectedRainLevel1: string = '';
  selectedRainLevel2: string = '';

  morning: string = '1';
  afternoon: string = '2';
  period_id: string = '';
  rain_start1: string = '00:00';
  rain_start2: string = '00:00';
  rain_end1: string = '00:00';
  rain_end2: string = '00:00';


  inspect_start: string = '00:00';
  inspect_end: string = '00:00';

  work_start: string = '00:00';
  work_end: string = '00:00';

  labor: any[] = [];
  labor_num: number = 0;

  work: any[] = [];
  num: number = 0;

  tool: any[] = [];
  tool_num: number = 0;

  mat: any[] = [];
  mat_num: number = 0;

  problem: string = '';

  strike_detail: string = '';
  strike_cause: string = '';

  od_detail: string = '';

  statuses1: boolean = false;
  statuses2: boolean = false;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private periodService: PeriodService,
    private sta: StaWeatherService,
    private weatherService: WeatherService,
    private laborService: LaborService,
    private workService: WorkService,
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
  ) { }



  ngOnInit() {
    this.periodService.readOne(this.morning).subscribe(data => {
      if (this.period_id = data['period_id']) {
        this.selectPeriod1 = this.period_id;
      }
    });
    this.periodService.readOne(this.afternoon).subscribe(data => {
      if (this.period_id = data['period_id']) {
        this.selectPeriod2 = this.period_id;
      }
    });
    this.periodService.read().subscribe(data => {
      this.period = data;
    });
    this.sta.read().subscribe(data => {
      this.status = data;
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
    this.resultService.read().subscribe(data => {
      this.result = data;
    });
    this.rainLevelService.read().subscribe(data => {
      this.rain_level = data;
    })
  }

  onDropdownChange1() {
    // เมื่อมีการเปลี่ยนค่าใน dropdown
    // ตรวจสอบค่าที่เลือกและตั้งค่าตัวแปร showInput ตามต้องการ
    this.statuses1 = this.selectStatus1 == '3';

    // ใช้ === ในการเปรียบเทียบค่า เนื่องจาก == อาจทำให้เกิดปัญหาเมื่อเปรียบเทียบ string และ number
    if (this.selectStatus1 !== '3') {
      this.selectedRainLevel1 = '1'; // ใช้ = ไม่ใช่ === เนื่องจากเป็นการกำหนดค่า
      // console.log(this.selectedRainLevel1);
    }
  }

  onDropdownChange2() {
    // เมื่อมีการเปลี่ยนค่าใน dropdown
    // ตรวจสอบค่าที่เลือกและตั้งค่าตัวแปร showInput ตามต้องการ
    this.statuses2 = this.selectStatus2 == '3';

    // ใช้ === ในการเปรียบเทียบค่า เนื่องจาก == อาจทำให้เกิดปัญหาเมื่อเปรียบเทียบ string และ number
    if (this.selectStatus2 !== '3') {
      this.selectedRainLevel2 = '1'; // ใช้ = ไม่ใช่ === เนื่องจากเป็นการกำหนดค่า
      // console.log(this.selectedRainLevel2);
    }
  }


  createDetail() {
    let rainStart1: Date;
    if (this.rain_start1 === '00:00') {
      rainStart1 = new Date(`1970-01-01T${this.rain_start1}`);
    } else {
      rainStart1 = new Date(this.rain_start1);
    }

    let rainEnd1: Date;
    if (this.rain_end1 === '00:00') {
      rainEnd1 = new Date(`1970-01-01T${this.rain_end1}`);
    } else {
      rainEnd1 = new Date(this.rain_end1);
    }

    let rainStart2: Date;
    if (this.rain_start2 === '00:00') {
      rainStart2 = new Date(`1970-01-01T${this.rain_start2}`);
    } else {
      rainStart2 = new Date(this.rain_start2);
    }

    let rainEnd2: Date;
    if (this.rain_end2 === '00:00') {
      rainEnd2 = new Date(`1970-01-01T${this.rain_end2}`);
    } else {
      rainEnd2 = new Date(this.rain_end2);
    }

    let inspectStart: Date;
    if (this.inspect_start === '00:00') {
      inspectStart = new Date(`1970-01-01T${this.inspect_start}`);
    } else {
      inspectStart = new Date(this.inspect_start);
    }

    let inspectEnd: Date;
    if (this.inspect_end === '00:00') {
      inspectEnd = new Date(`1970-01-01T${this.inspect_end}`);
    } else {
      inspectEnd = new Date(this.inspect_end);
    }

    let workStart: Date;
    if (this.work_start === '00:00') {
      workStart = new Date(`1970-01-01T${this.work_start}`);
    } else {
      workStart = new Date(this.work_start);
    }

    let workEnd: Date;
    if (this.work_end === '00:00') {
      workEnd = new Date(`1970-01-01T${this.work_end}`);
    } else {
      workEnd = new Date(this.work_end);
    }

    const formattedrainStart1 = format(rainStart1, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedrainEnd1 = format(rainEnd1, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedrainStart2 = format(rainStart2, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedrainEnd2 = format(rainEnd2, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedInspectStart = format(inspectStart, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedInspectEnd = format(inspectEnd, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedworkStart = format(workStart, "yyyy-MM-dd HH:mm:ss", { locale: th });
    const formattedworkEnd = format(workEnd, "yyyy-MM-dd HH:mm:ss", { locale: th });

    const morning = {
      period_id: this.selectPeriod1,
      sta_id: this.selectStatus1,
      rain_id: this.selectedRainLevel1,
      rain_start: formattedrainStart1,
      rain_end: formattedrainEnd1,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id,
    }
    const afternoon = {
      period_id: this.selectPeriod2,
      sta_id: this.selectStatus2,
      rain_id: this.selectedRainLevel2,
      rain_start: formattedrainStart2,
      rain_end: formattedrainEnd2,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id,
    }
    const time_inspect = {
      inspect_start: formattedInspectStart,
      inspect_end: formattedInspectEnd,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id,
    }
    const work_time = {
      work_start: formattedworkStart,
      work_end: formattedworkEnd,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id,
    }
    const problem = {
      problem: this.problem,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    }
    const strike = {
      strike_detail: this.strike_detail,
      strike_cause: this.strike_cause,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    }
    const inspection = {
      inspec_result_id: this.selectResult,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    }
    const overdue = {
      od_detail: this.od_detail,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id
    }


    const creatRequests: Observable<any>[] = [
      this.weatherService.create(morning),
      this.weatherService.create(afternoon),
      this.timeInspectService.create(time_inspect),
      this.workingTimeService.create(work_time),
      this.laborService.create(this.labor),
      this.workService.create(this.work),
      this.toolService.create(this.tool),
      this.matService.create(this.mat),
      this.problemService.create(problem),
      this.strikeService.create(strike),
      this.inspecService.create(inspection),
      this.overdueService.create(overdue)
    ]
    const deleteAddedData: Observable<any>[] = [
      this.weatherService.delete(this.config.data.dr_id),
      this.weatherService.delete(this.config.data.dr_id),
      this.timeInspectService.delete(this.config.data.dr_id),
      this.workingTimeService.delete(this.config.data.dr_id),
      this.laborService.delete(this.config.data.dr_id),
      this.workService.delete(this.config.data.dr_id),
      this.toolService.delete(this.config.data.dr_id),
      this.matService.delete(this.config.data.dr_id),
      this.problemService.delete(this.config.data.dr_id),
      this.strikeService.delete(this.config.data.dr_id),
      this.inspecService.delete(this.config.data.dr_id),
      this.overdueService.delete(this.config.data.dr_id)
    ]

    forkJoin(creatRequests).subscribe(
      (responses: any[]) => {
        // Handle responses
        for (const res of responses) {
          if (res.status === 'success') {
            Swal.fire({
              title: 'สำเร็จ',
              text: 'เพิ่มรายงานประจำวันสำเร็จ',
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
              text: 'เกิดข้อผิดพลาดในการเพิ่มรายงานประจำวันสำเร็จ',
              icon: 'error',
              confirmButtonText: 'ตกลง'
            }).then((result) => {
              if (result.isConfirmed) {
                // ตรวจสอบว่า Observables ใน deleteAddedData สำเร็จหรือไม่
                forkJoin(deleteAddedData).subscribe(
                  () => {
                    // หากลบข้อมูลสำเร็จ ทำตามที่คุณต้องการ
                    console.log('Delete added data successfully');
                  },
                  deleteError => {
                    // หากมีข้อผิดพลาดในการลบข้อมูล
                    console.error('Error deleting added data:', deleteError);
                  }
                );
              }
            });
            break;  // Stop checking if any of the requests failed
          }
        }
      },
      (error: any) => {
        console.error('Error in createRequests:', error);
      }
    );


  }

  // ************************************LABOR***********************************
  addNewLabor(): void {
    const newLabor = { labor_name_id: this.selectLaborName, labor_num: this.labor_num, dr_id: this.config.data.dr_id, project_id: this.config.data.project_id };
    this.labor.push(newLabor); // เพิ่ม object ใหม่เข้าไปในตัวแปร labor
  }
  removeLabor(index: number): void {
    this.labor.splice(index, 1); // ลบ object ที่ index ที่กำหนดออกจากตัวแปร labor
  }

  // ************************************WORK***********************************
  addNewWork() {
    this.num++;
    const newWork = { work_num: this.num, work_detail: '', dr_id: this.config.data.dr_id, project_id: this.config.data.project_id };
    this.work.push(newWork);
  }
  removeWork(index: number): void {
    this.work.splice(index, 1); // ลบ object ที่ index ที่กำหนดออกจากตัวแปร labor
    this.num--;
  }

  // *******************************************TOOL*********************************************
  addNewTool() {
    const newTool = { tool_name_id: this.selectToolName, tool_num: this.tool_num, dr_id: this.config.data.dr_id, project_id: this.config.data.project_id };
    this.tool.push(newTool);
    this.selectToolName = '';
  }
  removeTool(index: number): void {
    this.tool.splice(index, 1);
  }

  // *******************************************MATERIAL*********************************************
  addNewMat() {
    const newMat = { mat_name_id: this.selectMatName, mat_num: this.mat_num, dr_id: this.config.data.dr_id, project_id: this.config.data.project_id };
    this.mat.push(newMat);
    this.selectMatName = '';
  }
  removeMat(index: number): void {
    this.mat.splice(index, 1);
  }

  closeDialog() {
    this.dialogRef.close(); // เรียกเมื่อต้องการปิด dialog
  }
}
