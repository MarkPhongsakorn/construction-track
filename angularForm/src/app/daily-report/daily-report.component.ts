import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddReportComponent } from '../add-report/add-report.component';
import { ReportService } from '../services/reports/report.service';
import { EditReportComponent } from '../edit-report/edit-report.component';
import { DeleteReportComponent } from '../delete-report/delete-report.component';
import { AddDetailComponent } from '../add-detail/add-detail.component';
import { DetailReportComponent } from '../detail-report/detail-report.component';
import { ProjectService } from '../services/projects/project.service';
import { ExcelWeeklyService } from '../services/reports/excel-weekly.service';
import { WeatherService } from '../services/reports/weather.service';
import { LaborService } from '../services/reports/labor.service';
import { WorkService } from '../services/reports/work.service';
import { ToolService } from '../services/reports/tool.service';
import { MaterialService } from '../services/reports/material.service';
import { ProblemService } from '../services/reports/problem.service';
import { StrikeService } from '../services/reports/strike.service';
import { InspectionService } from '../services/reports/inspection.service';
import { OverdueService } from '../services/reports/overdue.service';
import { TimeInspectService } from '../services/reports/time-inspect.service';
import { WorkingTimeService } from '../services/reports/working-time.service';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { forkJoin, Observable } from 'rxjs';
import { map, concatMap, toArray } from 'rxjs/operators';


@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css'],
  providers: [DialogService]
})
export class DailyReportComponent implements OnInit {

  row: number = 20; // จำนวนแถวที่แสดงต่อหน้า
  first: number = 0; // ตำแหน่งของหน้าที่กำลังแสดง

  reports: any[] = [];

  morning: string = '1';
  afternoon: string = '2';

  ref: DynamicDialogRef | undefined;

  projectID: boolean = false;
  load: boolean = true;
  project: string = '';
  dr_id: string = '';
  drIds: string[] = [];
  dateWeek: string[] = [];

  project_start: Date = new Date();
  project_end: Date = new Date();

  minDate: Date = new Date();
  maxDate: Date = new Date();

  minDateEnd: Date = new Date();
  maxDateEnd: Date = new Date();

  weekNumber: number = 0;

  works: any[] = [];
  work_detail: string[] = [];

  labor_num1: number[] = [];
  labor_num2: number[] = [];
  labors: [] = [];

  mor: [] = [];
  after: [] = [];
  status1: number[] = [];
  status2: number[] = [];
  rainLevel1: number[] = [];
  rainLevel2: number[] = [];
  rainTime1: string[] = [];
  rainTime2: string[] = [];

  toolAndMats: string[] = [];
  tool_name_id: number[] = [];
  tool_num: string[] = [];
  mat_num: number[] = [];

  user: string = '';
  prefix: string = '';
  user_fname: string = '';
  user_lname: string = '';

  dr_ids: string = '2';
  labor_name_id: string = '2';
  Tname: string[] = [];
  tool_name_ids: string = '2';

  constructor(
    public dialogService: DialogService,
    private report: ReportService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private excelWeeklyService: ExcelWeeklyService,
    private weatherService: WeatherService,
    private laborService: LaborService,
    private workService: WorkService,
    private toolService: ToolService,
    private matService: MaterialService,
    private problemService: ProblemService,
    private strikeService: StrikeService,
    private inspecService: InspectionService,
    private overdueService: OverdueService,
    private reportService: ReportService,
    private timeInspectService: TimeInspectService,
    private workingTimeService: WorkingTimeService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.project = (+params['project_id']).toString();
      this.loadReportData();
    });
    this.projectService.readOne(this.project).subscribe(data => {
      this.minDate = new Date(data['project_start']);
      this.maxDate = new Date(data['project_end']);
    })
    // this.toolService.readByName(this.tool_name_ids).subscribe(data => {
    //   this.Tname = data;
    //   console.log(this.Tname);
    // })
  }

  updateDateRange() {
    // อัปเดต minDate ของวันสิ้นสุดให้เป็นวันที่ของ project_start
    this.minDateEnd = this.project_start;
    // อัปเดต maxDate ของวันสิ้นสุดให้เป็นวันที่ของ project_start + 6 วัน
    this.maxDateEnd.setDate(this.project_start.getDate() + 6);
  }

  loadReportData() {
    this.report.getOneByproject(this.project).subscribe(res => {
      // this.date = res['project_name'];
      if (res.status === 'error') {
        this.projectID = true;
      } else {
        this.reports = res;
        this.projectID = false;
      }

    });
  }

  openDialog() {
    this.ref = this.dialogService.open(AddReportComponent, {
      data: { project_id: this.project }, header: ''
    });
  }

  openDialog2(dr_id: string) {
    this.dr_id = dr_id;
    this.ref = this.dialogService.open(EditReportComponent, {
      data: { dr_id: this.dr_id }, header: ''
    });
  }

  openDialog3(dr_id: string) {
    this.dr_id = dr_id;
    this.ref = this.dialogService.open(DeleteReportComponent, {
      data: { dr_id: this.dr_id }, header: ''
    });
  }

  openDialog4(dr_id: string) {
    this.dr_id = dr_id;
    this.ref = this.dialogService.open(AddDetailComponent, {
      data: { dr_id: this.dr_id, project_id: this.project }, header: ''
    });
  }

  openDialog5(dr_id: string) {
    this.dr_id = dr_id;
    this.ref = this.dialogService.open(DetailReportComponent, {
      data: { dr_id: this.dr_id, project_id: this.project }, header: ''
    });
  }

  searchWeekly() {

    const projectStart = format(this.project_start, 'yyyy-MM-dd');
    const projectEnd = format(this.project_end, 'yyyy-MM-dd');

    this.report.getWeek(this.project, projectStart, projectEnd).subscribe(res => {
      if (res.status === 'error') {
        Swal.fire({
          title: 'ไม่มีข้อมูล',
          text: 'ไม่มีข้อมูลในช่วงวันเวลาที่คุณค้นหา',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      } else {
        this.reports = res;
        this.reports.forEach((report, index) => {
          // console.log(report);

          this.drIds[index] = report.dr_id;
          // console.log(this.drIds);
          this.dateWeek.push(report.dr_time);

          // คำนวณ weekNumber โดยใช้ this.minDate และ this.maxDate
          const reportDate = new Date(report.dr_time);
          this.weekNumber = this.calculateWeekNumber(reportDate);
        })

        this.load = false;
      }
      this.work();
      this.laborEngineer();
      this.laborNotEngineer();
      this.weather();
      this.toolAndMat();
      this.numToolAndMat();
    });
    this.projectService.readOne(this.project).subscribe(data => {
      // this.prefix = data['prefix_tname'];
      this.user_fname = data['user_fname'];
      this.user_lname = data['user_lname'];
      this.user = this.user_fname + ' ' + this.user_lname;
      // console.log(this.user);


    })
  }

  // เพิ่มฟังก์ชันคำนวณ weekNumber
  calculateWeekNumber(reportDate: Date): number {
    // คำนวณ weekNumber จาก this.minDate
    const timeDiff = reportDate.getTime() - this.minDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    const weekNumber = Math.ceil((daysDiff + 1) / 7);
    return weekNumber;
  }

  work() {
    const observables = this.drIds.map(drId => this.workService.readOne(drId));


    forkJoin(observables).pipe(
      map(results => {
        return results.map(result => {
          if (Array.isArray(result)) {
            // ถ้า result เป็น array
            return result.map(innerResult => innerResult.work_detail);
          } else {
            // ถ้า result ไม่เป็น array
            return result.message;
          }
        });
      })
    ).subscribe(workDetails => {
      this.work_detail = workDetails
      // console.log(this.work_detail);
    });
  }

  laborEngineer() {
    const observables = this.drIds.map(drId => this.laborService.readNameId(drId, this.labor_name_id));

    forkJoin(observables).pipe(
      map(results => {
        return results.flatMap(result => {
          if (Array.isArray(result)) {
            // ถ้า result เป็น array
            return result.map(innerResult => innerResult.labor_num);
          } else {
            // ถ้า result ไม่เป็น array
            return result.message;
          }
        });
      })
    ).subscribe(laborNum => {
      this.labor_num1 = laborNum;
      // console.log(this.labor_num1);
    });
  }

  laborNotEngineer() {
    const observables = this.drIds.map(drId => this.laborService.readNotEngineer(drId, this.labor_name_id));

    forkJoin(observables).pipe(
      map(results => {
        return results.map(result => {
          if (Array.isArray(result)) {
            // ถ้า result เป็น array
            if (result.some(innerResult => innerResult.status === 'error')) {
              // ถ้ามี innerResult ใน array ที่ message เท่ากับ 'error'
              return 0;
            } else {
              // ถ้าไม่มี innerResult ใน array ที่ message เท่ากับ 'error'
              return result.reduce((sum, innerResult) => sum + innerResult.labor_num, 0);
            }
          } else {
            // ถ้า result ไม่เป็น array
            return result.status === 'error' ? 0 : result.status;
          }
        });
      })
    ).subscribe(laborNum => {
      this.labor_num2 = laborNum;
      // console.log(this.labor_num2);
    });
  }

  weather() {
    const observables1 = this.drIds.map(dr_id => this.weatherService.readOne(dr_id, this.morning));
    const observables2 = this.drIds.map(dr_id => this.weatherService.readOne(dr_id, this.afternoon));

    forkJoin(observables1).subscribe(results => {
      // results เป็น array ของผลลัพธ์จากทุก observables
      this.status1 = results.map(data => data['sta_id']);
      // console.log('เช้า: ', this.status1);
    });
    forkJoin(observables2).subscribe(results => {
      this.status2 = results.map(data => data['sta_id']);
      // console.log('บ่าย: ', this.status2);
    })
    forkJoin(observables1).subscribe(results => {
      // results เป็น array ของผลลัพธ์จากทุก observables
      this.rainLevel1 = results.map(data => data['rain_id']);
      // console.log('ระดับฝนเช้า: ', this.rainLevel1);
    });
    forkJoin(observables2).subscribe(results => {
      this.rainLevel2 = results.map(data => data['rain_id']);
      // console.log('ระดับฝนบ่าย: ', this.rainLevel2);
    })
    forkJoin(observables1).subscribe(results => {
      // results เป็น array ของผลลัพธ์จากทุก observables
      this.rainTime1 = results.map(data => data['rain_start']);
      // console.log('เวลาฝนตกเช้า: ', this.rainTime1);
    });
    forkJoin(observables2).subscribe(results => {
      this.rainTime2 = results.map(data => data['rain_start']);
      // console.log('เวลาฝนตกบ่าย: ', this.rainTime2);
    })
  }

  toolAndMat() {
    const observables1 = this.drIds.map(drId => this.toolService.readOne(drId));
    const observables2 = this.drIds.map(drId => this.matService.readOne(drId));

    forkJoin([forkJoin(observables1), forkJoin(observables2)]).pipe(
      map(([toolResults, matResults]) => {
        const uniqueNames = new Set<string>();

        toolResults.forEach(result => {
          if (Array.isArray(result)) {
            result.forEach(innerResult => {
              if (innerResult.tool_name !== 'ไม่มีเครื่องมือและเครื่องจักร') {
                uniqueNames.add(innerResult.tool_name);
              }
            });
          } else {
            if (result.message !== 'ไม่มีเครื่องมือและเครื่องจักร') {
              uniqueNames.add(result.message);
            }
          }
        });

        matResults.forEach(result => {
          if (Array.isArray(result)) {
            result.forEach(innerResult => {
              if (innerResult.mat_name !== 'ไม่มีวัสุดที่เข้าหน่วยงาน') {
                uniqueNames.add(innerResult.mat_name);
              }
            });
          } else {
            if (result.message !== 'ไม่มีวัสุดที่เข้าหน่วยงาน') {

              uniqueNames.add(result.message);
            }
          }
        });

        return Array.from(uniqueNames);
      })
    ).subscribe(combinedNames => {
      this.toolAndMats = combinedNames;
      // console.log(this.toolAndMats);
    });
  }

  numToolAndMat() {
    const observables1 = this.drIds.map(drId => this.toolService.readOne(drId));
    const observables2 = this.drIds.map(drId => this.matService.readOne(drId));

    forkJoin([forkJoin(observables1), forkJoin(observables2)]).pipe(
      map(([toolResults, matResults]: [any[], any[]]) => {
        let resultDetails: any[] = [];

        for (let i = 0; i < this.drIds.length; i++) {

          const toolResult = toolResults[i];
          const matResult = matResults[i];

          let toolNames: any[] = [];
          let matNames: any[] = [];

          if (Array.isArray(toolResult)) {
            // ถ้า result เป็น array
            toolNames = toolResult.map(innerResult => innerResult.tool_name);
          } else {
            // ถ้า result ไม่เป็น array
            toolNames = [toolResult.message];
          }

          if (Array.isArray(matResult)) {
            // ถ้า result เป็น array
            matNames = matResult.map(innerResult => innerResult.mat_name);
          } else {
            // ถ้า result ไม่เป็น array
            matNames = [matResult.message];
          }

          // const combinedNames = ;

          resultDetails.push([...toolNames, ...matNames]);
        }

        return resultDetails;
      })
    ).subscribe(Name => {
      this.Tname = Name;
      // console.log(this.Tname);
    });



    forkJoin([forkJoin(observables1), forkJoin(observables2)]).pipe(
      map(([toolResults, matResults]: [any[], any[]]) => {
        let resultDetails: any[] = [];

        for (let i = 0; i < this.drIds.length; i++) {

          const toolResult = toolResults[i];
          const matResult = matResults[i];

          let toolNums: any[] = [];
          let matNums: any[] = [];

          if (Array.isArray(toolResult)) {
            // ถ้า result เป็น array
            toolNums = toolResult.map(innerResult => innerResult.tool_num);
          } else {
            // ถ้า result ไม่เป็น array
            toolNums = [toolResult.message];
          }

          if (Array.isArray(matResult)) {
            // ถ้า result เป็น array
            matNums = matResult.map(innerResult => innerResult.mat_num);
          } else {
            // ถ้า result ไม่เป็น array
            matNums = [matResult.message];
          }

          // const combinedNames = ;

          resultDetails.push([...toolNums, ...matNums]);
        }

        return resultDetails;
      })
    ).subscribe(Num => {
      this.tool_num = Num;
      // console.log(this.tool_num);
    });

  }

  downloadWeekly() {
    const month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

    const formattedDates = [];
    for (const date of this.dateWeek) {
      const drTime = new Date(date);
      const formattedDate = format(drTime, 'dd');
      let thaiDate = `${formattedDate} ${month[drTime.getMonth()]} ${drTime.getFullYear() + 543}`;
      formattedDates.push(thaiDate);
    }

    // console.log(formattedDates[0]);

    const AbbreviationDates = [];
    for (const date of this.dateWeek) {
      const drTime = new Date(date);
      const abbreviationDate = format(drTime, 'dd');
      const Yearthai = (drTime.getFullYear() + 543).toString().slice(-2);
      let thaiDate = `${abbreviationDate} ${months[drTime.getMonth()]} ${Yearthai}`;
      AbbreviationDates.push(thaiDate);
    }

    // console.log(AbbreviationDates);

    const fileName = 'รายงานประจำสัปดาห์ที่-' + this.weekNumber;
    const sheetName = 'Week-' + this.weekNumber;

    this.excelWeeklyService.exportToExcel(
      this.weekNumber,
      formattedDates,
      this.work_detail,
      AbbreviationDates,
      this.labor_num1,
      this.labor_num2,
      this.status1,
      this.status2,
      this.rainLevel1,
      this.rainLevel2,
      this.rainTime1,
      this.rainTime2,
      this.toolAndMats,
      this.Tname,
      this.tool_num,
      this.user,
      fileName,
      sheetName
    );
  }

}
