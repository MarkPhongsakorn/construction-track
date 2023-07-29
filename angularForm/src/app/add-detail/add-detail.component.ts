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
import Swal from 'sweetalert2';



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

  result: any[] =[];
  selectResult: string = '';

  morning: string = '1';
  afternoon: string = '2';
  period_id: string = '';

  labor: any[] = [];

  work: any[] = [];
  num: number = 0;

  tool: any[] = [];

  mat: any[] = [];

  strike_detail: string = '';
  strike_cause: string = '';

  statuses: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddDetailComponent>,
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
    private resultService: InspecResultService
  ) {}

  

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
    })

  }

  addDetail() {
    this.mor();
    this.after();
    this.labors();
    this.works();
    this.tools();
    this.material();
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
      period_id: this.selectPeriod1,
      sta_id: this.selectStatus2,
      dr_id: this.data.dr_id,
      project_id: this.data.project_id,
    }
    this.weatherService.create(data).subscribe((res: any) => {
      if (res.status === 'success') {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  after() {
    const data = {
      period_id: this.selectPeriod2,
      sta_id: this.selectStatus2,
      dr_id: this.data.dr_id,
      project_id: this.data.project_id,
    }
    this.weatherService.create(data).subscribe((res: any) => {
      if (res.status === 'success') {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  // ************************************LABOR***********************************
  addNewLabor(): void {
    const newLabor = { labor_name: '', labor_num: null, dr_id: this.data.dr_id, project_id: this.data.project_id };
    this.labor.push(newLabor); // เพิ่ม object ใหม่เข้าไปในตัวแปร labor
  }
  removeLabor(index: number): void {
    this.labor.splice(index, 1); // ลบ object ที่ index ที่กำหนดออกจากตัวแปร labor
  }
  labors() {
    this.laborService.create(this.labor).subscribe((res: any) => {
      if (res.status === 'success') {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  // ************************************WORK***********************************
  addNewWork() {
    this.num++;
    const newWork = { work_num: this.num, work_detail: '', dr_id: this.data.dr_id, project_id: this.data.project_id };
    this.work.push(newWork);
  }
  removeWork(index: number): void {
    this.work.splice(index, 1); // ลบ object ที่ index ที่กำหนดออกจากตัวแปร labor
    this.num--;
  }
  works() {
    this.workService.create(this.work).subscribe((res: any) => {
      if (res.status === 'success') {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  // *******************************************TOOL*********************************************
  addNewTool() {
    const newTool = { tool_name: '', tool_num: null, unit_id: this.selectUnit, dr_id: this.data.dr_id, project_id: this.data.project_id };
    this.tool.push(newTool);
    this.selectUnit = '';
  }
  removeTool(index: number): void {
    this.tool.splice(index, 1);
  }
  tools() {
    this.toolService.create(this.tool).subscribe((res: any) => {
      if (res.status === 'success') {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  // *******************************************MATERIAL*********************************************
  addNewMat() {
    const newMat = { mat_name: '', mat_num: null, unit_id: this.selectUnit, dr_id: this.data.dr_id, project_id: this.data.project_id };
    this.mat.push(newMat);
    this.selectUnit = '';
  }
  removeMat(index: number): void {
    this.mat.splice(index, 1);
  }
  material() {
    this.matService.create(this.mat).subscribe((res: any) => {
      if (res.status === 'success') {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  strikes() {
    const data = {
      strike_detail: this.strike_detail,
      strike_cause: this.strike_cause,
      dr_id: this.data.dr_id,
      project_id: this.data.project_id
    }
    this.strikeService.create(data).subscribe((res: any) => {
      if (res.status === 'success') {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }

  inspec() {
    const data = {
      inspec_result_id: this.selectResult,
      dr_id: this.data.dr_id,
      project_id: this.data.project_id
    }
    this.inspecService.create(data).subscribe((res: any) => {
      console.log(data);
      
      if (res.status === 'success') {
        return this.statuses = true
      } else {
        return this.statuses
      }
    });
  }
}
