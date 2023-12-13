import { Component, OnInit } from '@angular/core';
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
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { forkJoin, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
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

  unit: any[] = [];
  selectUnit: string = '';

  result: any[] = [];
  selectResult: string = '';

  rain_level: any[] = [];
  selectedRainLevel1: string = '';
  selectedRainLevel2: string = '';

  morning: string = '1';
  rain_start1: string = '00:00';
  rain_start2: string = '00:00';
  rain_end1: string = '00:00';
  rain_end2: string = '00:00';

  afternoon: string = '2';
  period_id: string = '';

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
    private unitService: UnitService,
    private toolService: ToolService,
    private matService: MaterialService,
    private problemService: ProblemService,
    private strikeService: StrikeService,
    private inspecService: InspectionService,
    private resultService: InspecResultService,
    private overdueService: OverdueService,
    private rainLevelService: RainLevelService,
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
    this.unitService.read().subscribe(data => {
      this.unit = data;
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
      console.log(this.selectedRainLevel1);
    }
  }

  onDropdownChange2() {
    // เมื่อมีการเปลี่ยนค่าใน dropdown
    // ตรวจสอบค่าที่เลือกและตั้งค่าตัวแปร showInput ตามต้องการ
    this.statuses2 = this.selectStatus2 == '3';

    // ใช้ === ในการเปรียบเทียบค่า เนื่องจาก == อาจทำให้เกิดปัญหาเมื่อเปรียบเทียบ string และ number
    if (this.selectStatus2 !== '3') {
      this.selectedRainLevel2 = '1'; // ใช้ = ไม่ใช่ === เนื่องจากเป็นการกำหนดค่า
      console.log(this.selectedRainLevel2);
    }
  }


  createDetail() {
    this.rain_start1 = format(new Date(this.rain_start1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { locale: th });
    this.rain_end1 = format(new Date(this.rain_end1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { locale: th });
    this.rain_start2 = format(new Date(this.rain_start2), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { locale: th });
    this.rain_end2 = format(new Date(this.rain_end2), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { locale: th });
    const morning = {
      period_id: this.selectPeriod1,
      sta_id: this.selectStatus1,
      rain_id: this.selectedRainLevel1,
      rain_start: this.rain_start1,
      rain_end: this.rain_end1,
      dr_id: this.config.data.dr_id,
      project_id: this.config.data.project_id,
    }
    const afternoon = {
      period_id: this.selectPeriod2,
      sta_id: this.selectStatus2,
      rain_id: this.selectedRainLevel2,
      rain_start: this.rain_start2,
      rain_end: this.rain_end2,
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
      this.laborService.create(this.labor),
      this.workService.create(this.work),
      this.toolService.create(this.tool),
      this.matService.create(this.mat),
      this.problemService.create(problem),
      this.strikeService.create(strike),
      this.inspecService.create(inspection),
      this.overdueService.create(overdue)
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
            });
            break;  // Stop checking if any of the requests failed
          }
        }
      });
  }

  // ************************************LABOR***********************************
  addNewLabor(): void {
    const newLabor = { labor_name: '', labor_num: this.labor_num, dr_id: this.config.data.dr_id, project_id: this.config.data.project_id };
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
    const newTool = { tool_name: '', tool_num: this.tool_num, unit_id: this.selectUnit, dr_id: this.config.data.dr_id, project_id: this.config.data.project_id };
    this.tool.push(newTool);
    this.selectUnit = '';
  }
  removeTool(index: number): void {
    this.tool.splice(index, 1);
  }

  // *******************************************MATERIAL*********************************************
  addNewMat() {
    const newMat = { mat_name: '', mat_num: this.mat_num, unit_id: this.selectUnit, dr_id: this.config.data.dr_id, project_id: this.config.data.project_id };
    this.mat.push(newMat);
    this.selectUnit = '';
  }
  removeMat(index: number): void {
    this.mat.splice(index, 1);
  }

  closeDialog() {
    this.dialogRef.close(); // เรียกเมื่อต้องการปิด dialog
  }
}
