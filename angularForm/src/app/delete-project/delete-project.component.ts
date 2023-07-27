import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../services/projects/project.service';
import { ReportService } from '../services/reports/report.service';
import { WeatherService } from '../services/reports/weather.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

  project_name: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private project: ProjectService,
    private report: ReportService,
    private weather: WeatherService,
  ) {}
  ngOnInit() {
    this.project.readOne(this.data.project_id).subscribe(data => {
      this.project_name = data['project_name'];
    });
  }
  delete() {
    this.project.delete(this.data.project_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message); // Failed to create user
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
    this.report.delete(this.data.project_id).subscribe(res => {
      if (res.status === 'success') {
        window.location.reload();
      } else {
        console.log(res.message);
        alert('เกิดข้อผิดพลาดโปรดตรวจสอบอีกครั้ง');
      }
    });
    this.weather.delete(this.data.project_id).subscribe(res => {
      
    })
  }


}
