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
import { ProblemService } from '../services/reports/problem.service';
import { StrikeService } from '../services/reports/strike.service';
import { InspectionService } from '../services/reports/inspection.service';
import { InspecResultService } from '../services/reports/inspec-result.service';
import Swal from 'sweetalert2';

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
  result: any[] =[];
  selectResult: string = '';

  morning: string = '1';
  sta_time1: string = '00:00';
  afternoon: string = '2';
  sta_time2: string = '00:00';

  laborCr: any[] = [];
  laborUp: any[] = [];
  labor_id: string = '';

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

  statuses: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
    private resultService: InspecResultService
  ) {
  
  }

  ngOnInit() {
    this.periodService.readOne(this.morning).subscribe(data => {
        this.selectPeriod1 = data['period_id'];
    });
    this.periodService.readOne(this.afternoon).subscribe(data => {
        this.selectPeriod2 = data['period_id'];

    });
    this.weatherService.readOne(this.data.dr_id, this.morning).subscribe(data => {
      this.weather_id1 = data['weather_id'];
      this.selectStatus1 = data['sta_id'];
      this.sta_time1 = data['sta_time'];
    });
    this.weatherService.readOne(this.data.dr_id, this.afternoon).subscribe(data => {
      this.weather_id2 = data['weather_id'];
      this.selectStatus2 = data['sta_id'];
      this.sta_time2 = data['sta_time'];
    });
    this.laborService.readOne(this.data.dr_id).subscribe(data => {
      this.labor_id = data['labor_id'];
      this.laborUp = data;
    });
    this.workService.readOne(this.data.dr_id).subscribe(data => {
      this.work_id = data['work_id'];
      this.workUp = data;
    });
    this.toolService.readOne(this.data.dr_id).subscribe(data => {
      this.tool_id = data['tool_id'];
      this.toolUp = data;
    });
    this.matService.readOne(this.data.dr_id).subscribe(data => {
      this.mat_id = data['mat_id'];
      this.matUp = data;
    });
    this.problemService.readOne(this.data.dr_id).subscribe(data => {
      this.prob_id = data['prob_id'];
      this.problem = data['problem'];
    });
    this.strikeService.readOne(this.data.dr_id).subscribe(data => {
      this.strike_id = data['strike_id'];
      this.strike_cause = data['strike_cause'];
      this.strike_detail = data['strike_detail'];
    });
    this.inspecService.readOne(this.data.dr_id).subscribe(data => {
      this.inspec_id = data['inspec_id'];
      this.selectResult = data['inspec_result_id'];
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

  }

  addDetail() {
    this.mor();
    this.after();
    this.laborC();
    this.laborU();
    this.workC();
    this.workU();
    this.toolC();
    this.toolU();
    this.matC();
    this.matU();
    this.prob();
    this.strikes();
    this.inspec();
    if (this.statuses = true) {
      Swal.fire({
        title: 'สำเร็จ',
        text: 'การสร้างรายงานสำเร็จ',
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
        text: 'เกิดข้อผิดพลาดในการสร้างรายงาน',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    }
  }

  mor() {
    const data = {
      weather_id: this.weather_id1,
      period_id: this.selectPeriod1,
      sta_id: this.selectStatus1,
      sta_time: this.sta_time1,
      dr_id: this.data.dr_id,
      project_id: this.data.project_id,
    }
    this.weatherService.update(data).subscribe((res: any) => {
      if (res.status === "success") {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  after() {
    const data = {
      weather_id: this.weather_id2,
      period_id: this.selectPeriod2,
      sta_id: this.selectStatus2,
      sta_time: this.sta_time2,
      dr_id: this.data.dr_id,
      project_id: this.data.project_id,
    }
    this.weatherService.update(data).subscribe((res: any) => {
      if (res.status === "success") {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  // ************************************LABOR***********************************
  addNewLabor(): void {
    const newLabor = { 
      labor_name: '',
      labor_num: null,
      dr_id: this.data.dr_id, 
      project_id: this.data.project_id 
    };
    this.laborCr.push(newLabor); // เพิ่ม object ใหม่เข้าไปในตัวแปร labor
  }
  removeLabor(index: number): void {
    this.laborCr.splice(index, 1); // ลบ object ที่ index ที่กำหนดออกจากตัวแปร labor
  }
  laborC() {
    this.laborService.create(this.laborCr).subscribe((res: any) => {
      if (res.status === "success") {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }
  removeLaborU(index: number): void {
    Swal.fire({
      icon: 'question',
      title: 'คุณแน่ใจใช้มั้ยที่จะลบข้อมูลนี้?',
      text: 'การลบนี้จะไม่สามารถแก้ไขข้อมูลได้อีก',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Delete!', '', 'success')
        this.laborUp.splice(index, 1);
      }
    })
    
  }
  dataLabor() {
    const data = { 
      labor_id: this.labor_id,
      labor_name: '',
      labor_num: null,
      dr_id: this.data.dr_id,
      project_id: this.data.project_id
    };
    this.laborUp.push(data);
  }
  laborU() {
    this.laborService.update(this.laborUp).subscribe((res: any) => {
      if (res.status === "success") {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  // ************************************WORK***********************************
  addNewWork() {
    const newWork = { 
      work_num: this.num, 
      work_detail: '', 
      dr_id: this.data.dr_id, 
      project_id: this.data.project_id 
    };
    this.workCr.push(newWork);
  }
  removeWork(index: number): void {
    this.workCr.splice(index, 1); // ลบ object ที่ index ที่กำหนดออกจากตัวแปร labor
  }
  workC() {
    this.workService.create(this.workCr).subscribe((res: any) => {
      if (res.status === "success") {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }
  removeWorkU(index: number): void {
    Swal.fire({
      icon: 'question',
      title: 'คุณแน่ใจใช้มั้ยที่จะลบข้อมูลนี้?',
      text: 'การลบนี้จะไม่สามารถแก้ไขข้อมูลได้อีก',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Delete!', '', 'success')
        this.workUp.splice(index, 1);
      }
    })
  }
  dataWork() {
    const data = { 
     work_id: this.work_id,
     work_num: this.num,
     work_detail: '', 
     dr_id: this.data.dr_id,
     project_id: this.data.project_id
    };
    this.workUp.push(data);
  }
  workU() {
    this.workService.update(this.workUp).subscribe((res: any) => {
      if (res.status === "success") {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  // *******************************************TOOL*********************************************
  addNewTool() {
    const newTool = { 
      tool_name: '', 
      tool_num: null, 
      unit_id: this.selectUnit, 
      dr_id: this.data.dr_id, 
      project_id: this.data.project_id 
    };
    this.toolCr.push(newTool);
    this.selectUnit = '';
  }
  removeTool(index: number): void {
    this.toolCr.splice(index, 1);
  }
  toolC() {
    this.toolService.create(this.toolCr).subscribe((res: any) => {
      if (res.status === "success") {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }
  removeToolU(index: number): void {
    Swal.fire({
      icon: 'question',
      title: 'คุณแน่ใจใช้มั้ยที่จะลบข้อมูลนี้?',
      text: 'การลบนี้จะไม่สามารถแก้ไขข้อมูลได้อีก',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Delete!', '', 'success')
        this.toolUp.splice(index, 1);
      }
    })
  }
  dataTool() {
    const data = { 
      tool_id: this.tool_id, 
      tool_name: '', 
      tool_num: null, 
      unit_id: this.selectUnit, 
      dr_id: this.data.dr_id, 
      project_id: this.data.project_id
    };
    this.toolUp.push(data);
  }
  toolU() {
    this.toolService.update(this.toolUp).subscribe((res: any) => {
      if (res.status === "success") {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  // *******************************************MATERIAL*********************************************
  addNewMat() {
    const newMat = { 
      mat_name: '', 
      mat_num: null, 
      unit_id: this.selectUnit, 
      dr_id: this.data.dr_id, 
      project_id: this.data.project_id 
    };
    this.matCr.push(newMat);
    this.selectUnit = '';
  }
  removeMat(index: number): void {
    this.matCr.splice(index, 1);
  }
  matC() {
    this.matService.create(this.matCr).subscribe((res: any) => {
      if (res.status === "success") {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }
  removeMatU(index: number): void {
    Swal.fire({
      icon: 'question',
      title: 'คุณแน่ใจใช้มั้ยที่จะลบข้อมูลนี้?',
      text: 'การลบนี้จะไม่สามารถแก้ไขข้อมูลได้อีก',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Delete!', '', 'success')
        this.toolUp.splice(index, 1);
      }
    })
  }

  dataMat() {
    const data = { 
      mat_id: this.mat_id,
      mat_name: '', 
      mat_num: null, 
      unit_id: this.selectUnit, 
      dr_id: this.data.dr_id, 
      project_id: this.data.project_id
    };
    this.matUp.push(data);
  }
  matU() {
    this.matService.update(this.matUp).subscribe((res: any) => {
      if (res.status === "success") {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }


  prob() {
    const data = {
      prob_id: this.prob_id,
      problem: this.problem,
      dr_id: this.data.dr_id,
      project_id: this.data.project_id
    }
    this.problemService.update(data).subscribe((res: any) => {
      if (res.status === "success") {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  strikes() {
    const data = {
      strike_id: this.strike_id,
      strike_detail: this.strike_detail,
      strike_cause: this.strike_cause,
      dr_id: this.data.dr_id,
      project_id: this.data.project_id
    }
    this.strikeService.update(data).subscribe((res: any) => {
      if (res.status === "success") {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  inspec() {
    const data = {
      inspec_id: this.inspec_id,
      inspec_result_id: this.selectResult,
      dr_id: this.data.dr_id,
      project_id: this.data.project_id
    }
    this.inspecService.update(data).subscribe((res: any) => {
      if (res.status === "success") {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

}
