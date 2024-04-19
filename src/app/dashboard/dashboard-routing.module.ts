import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'aadhiwasi-certificate',
        loadChildren: () => import('./aadhiwasi-certificate/aadhiwasi-certificate.module').then(m => m.AadhiwasiCertificateModule)
      },
      {
        path: 'aadhiwasi-documents',
        loadChildren: () => import('./aadhiwasi-documents/aadhiwasi-documents.module').then(m=> m.AadhiwasiDocumentsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
