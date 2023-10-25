import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';

import {CdkDrag} from '@angular/cdk/drag-drop';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './services/users/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { AddReportComponent } from './add-report/add-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { DeleteReportComponent } from './delete-report/delete-report.component';
import { AddDetailComponent } from './add-detail/add-detail.component';
import { DetailReportComponent } from './detail-report/detail-report.component';
import { EditDetailComponent } from './edit-detail/edit-detail.component';
import { RequestAdminComponent } from './request-admin/request-admin.component';
import { RequestUserComponent } from './request-user/request-user.component';
import { AddRequestUserComponent } from './add-request-user/add-request-user.component';
import { PdfService } from './services/reports/pdf.service';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AddProjectComponent,
    EditProjectComponent,
    DeleteProjectComponent,
    DailyReportComponent,
    AddReportComponent,
    EditReportComponent,
    DeleteReportComponent,
    AddDetailComponent,
    DetailReportComponent,
    EditDetailComponent,
    RequestAdminComponent,
    RequestUserComponent,
    AddRequestUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatRadioModule,
    MatGridListModule,
    MatDividerModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSidenavModule,
    CdkDrag,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    InputTextareaModule,
    TableModule,
    DynamicDialogModule,
    CalendarModule,
    TooltipModule,
    FileUploadModule,
  ],
  providers: [AuthGuardService, PdfService],
  bootstrap: [AppComponent]
})
export class AppModule { }
