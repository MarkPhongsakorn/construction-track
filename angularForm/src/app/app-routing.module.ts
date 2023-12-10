import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './services/users/auth-guard.service';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { RequestAdminComponent } from './request-admin/request-admin.component';
import { RequestUserComponent } from './request-user/request-user.component';
import { ProfileComponent } from './profile/profile.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { LaborComponent } from './labor/labor.component';
import { ToolComponent } from './tool/tool.component';
import { MaterialComponent } from './material/material.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'request-user', component: RequestUserComponent, canActivate: [AuthGuardService] },
  { path: 'report/:project_id', component: DailyReportComponent, canActivate: [AuthGuardService] },
  { path: 'request-admin', component: RequestAdminComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent },
  { path: 'company', component: CompanyDetailComponent },
  { path: 'labor', component: LaborComponent },
  { path: 'tool', component: ToolComponent },
  { path: 'material', component: MaterialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
