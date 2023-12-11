import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { EditRequestUserComponent } from './edit-request-user/edit-request-user.component';
import { DeleteRequestUserComponent } from './delete-request-user/delete-request-user.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PdfService } from './services/reports/pdf.service';
import { LaborComponent } from './labor/labor.component';
import { ToolComponent } from './tool/tool.component';
import { MaterialComponent } from './material/material.component';
import { AddLaborNameComponent } from './add-labor-name/add-labor-name.component';
import { EditLaborNameComponent } from './edit-labor-name/edit-labor-name.component';
import { DeleteLaborNameComponent } from './delete-labor-name/delete-labor-name.component';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { DeleteCompanyComponent } from './delete-company/delete-company.component';
import { DownloadRequestComponent } from './download-request/download-request.component';
import { AddToolNameComponent } from './add-tool-name/add-tool-name.component';
import { EditToolNameComponent } from './edit-tool-name/edit-tool-name.component';
import { DeleteToolNameComponent } from './delete-tool-name/delete-tool-name.component';
import { AddMatNameComponent } from './add-mat-name/add-mat-name.component';
import { EditMatNameComponent } from './edit-mat-name/edit-mat-name.component';
import { DeleteMatNameComponent } from './delete-mat-name/delete-mat-name.component';



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
    AddRequestUserComponent,
    EditRequestUserComponent,
    DeleteRequestUserComponent,
    ProfileComponent,
    EditProfileComponent,
    CompanyDetailComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    DeleteCompanyComponent,
    DownloadRequestComponent,
    LaborComponent,
    ToolComponent,
    MaterialComponent,
    AddLaborNameComponent,
    EditLaborNameComponent,
    DeleteLaborNameComponent,
    AddToolNameComponent,
    EditToolNameComponent,
    DeleteToolNameComponent,
    AddMatNameComponent,
    EditMatNameComponent,
    DeleteMatNameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
    CardModule,
    DividerModule,
    PaginatorModule,
  ],
  providers: [AuthGuardService, PdfService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
