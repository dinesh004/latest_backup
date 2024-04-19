import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AadhiwasiCertificateComponent } from './dashboard/aadhiwasi-certificate/aadhiwasi-certificate.component';
import { AadhiwasiDocumentsComponent } from './dashboard/aadhiwasi-documents/aadhiwasi-documents.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Department1DocumentsComponent } from './dashboard2/department1-documents/department1-documents.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './guard/auth.guard';
import { DepartmentGuard } from './guard/department.guard';
import { Dashboard3Component } from './dashboard3/dashboard3.component';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent

  },
  { path: 'login', component: LoginComponent },
  {path: 'registration', component: RegistrationComponent},
  { path: 'dashboard', component: DashboardComponent,
  canActivate: [AuthGuard],
  children: [
    { path: 'aadhiwasi-certificate', component: AadhiwasiCertificateComponent },
    { path: 'aadhiwasi-documents', component: AadhiwasiDocumentsComponent}
  ] },
  {
    path: 'dashboard2', component: Dashboard2Component,
    canActivate: [DepartmentGuard],
    children: [
        {path: 'department1-doc', component: Department1DocumentsComponent}
    ]
  },
  {
    path: 'dashboard3', component: Dashboard3Component,
  }
];

